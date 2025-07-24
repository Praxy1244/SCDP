const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NGO = require('../models/NGO');
const ngoData = require('../../mock_data/ngo_data.json');

dotenv.config();

async function seedNGO() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await NGO.deleteMany(); // Clears old data

    const cleanedData = ngoData.map(({ id, ...rest }) => rest); // Remove `id`
    await NGO.insertMany(cleanedData);

    console.log('✅ NGOs seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding NGOs:', err);
    process.exit(1);
  }
}

seedNGO();
