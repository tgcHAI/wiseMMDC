const mongoose = require('mongoose');

const calcSchema = new mongoose.Schema({
  campusTotal: Number,
  onlineTotal: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Calc', calcSchema);
