const express = require('express');
const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const router = express.Router();

// ✅ Test Route
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from SCDP backend!' });
});

// ✅ Add a Donation and Match NGO
router.post('/donation', async (req, res) => {
  try {
    const { donorName, city, item, condition } = req.body;

    // Find NGO from MongoDB
    const matchedNGO = await NGO.findOne({ city });

    const newDonation = await Donation.create({
      donorName,
      city,
      item,
      condition,
      matchedNGO: matchedNGO
        ? { name: matchedNGO.name, contact: matchedNGO.contact, city: matchedNGO.city }
        : null
    });

    res.status(201).json(newDonation);
  } catch (error) {
    console.error("❌ Error in POST /donation:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Donations (Admin)
router.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Donation Status
router.patch('/donation/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedDonation)
      return res.status(404).json({ error: "Donation not found" });

    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Donation
router.put('/donation/:id', async (req, res) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Donation
router.delete('/donation/:id', async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ NGO Stats for Dashboard
router.get('/ngo-stats', async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      { $match: { matchedNGO: { $ne: null } } },
      { $group: { _id: "$matchedNGO.name", totalDonations: { $sum: 1 } } },
      { $sort: { totalDonations: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
