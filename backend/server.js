const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SCDP Backend is running...');
});

// Routes
app.use('/api', require('./routes/donationRoutes'));
app.use('/api/ngos', require('./routes/ngoRoutes'));
app.use(cors({
  origin: 'https://scdp-9rtdfnjuk-prathiksha-p-palankars-projects.vercel.app'  // Use your actual Vercel URL here
}));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
