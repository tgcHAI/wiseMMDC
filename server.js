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

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
