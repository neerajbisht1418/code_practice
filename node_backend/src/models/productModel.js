const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
});

module.exports = mongoose.model('Product', productSchema);
