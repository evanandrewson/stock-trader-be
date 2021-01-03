const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  stocks: [{
    symbol: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    }
  }],
  cash: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Portfolio', schema);