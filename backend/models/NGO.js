const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('NGO', ngoSchema);
