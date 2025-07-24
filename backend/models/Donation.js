const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  city: { type: String, required: true },
  item: { type: String, required: true },
  condition: { type: String, required: true },
  status: { type: String, default: "Submitted" },
  matchedNGO: {
    name: { type: String },
    contact: { type: String },
    city: { type: String }
  }
}, { timestamps: true });


module.exports = mongoose.model('Donation', donationSchema);
