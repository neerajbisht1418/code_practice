const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  amount: Number,
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  accepted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Bid', bidSchema);
