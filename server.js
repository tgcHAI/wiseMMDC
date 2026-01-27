const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

const Calc = require('./models/Calc');

// Save calculation
app.post('/api/calc', async (req, res) => {
  try {
    const { campusTotal, onlineTotal } = req.body;
    const calc = new Calc({ campusTotal, onlineTotal });
    await calc.save();
    res.status(201).json(calc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

// Get last 3 calculations
app.get('/api/calcs', async (req, res) => {
  try {
    const calcs = await Calc.find().sort({ date: -1 }).limit(3);
    res.json(calcs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch calculations' });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
