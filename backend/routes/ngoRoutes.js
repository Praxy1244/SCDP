const express = require('express');
const NGO = require('../models/NGO');
const router = express.Router();

// Get all NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find().sort({ createdAt: -1 });
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add NGO
router.post('/', async (req, res) => {
  try {
    const { name, city, contact } = req.body;
    const newNGO = await NGO.create({ name, city, contact });
    res.status(201).json(newNGO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update NGO
router.put('/:id', async (req, res) => {
  try {
    const { name, city, contact } = req.body;
    const updatedNGO = await NGO.findByIdAndUpdate(
      req.params.id,
      { name, city, contact },
      { new: true }
    );
    res.json(updatedNGO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete NGO
router.delete('/:id', async (req, res) => {
  try {
    await NGO.findByIdAndDelete(req.params.id);
    res.json({ message: 'NGO deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
