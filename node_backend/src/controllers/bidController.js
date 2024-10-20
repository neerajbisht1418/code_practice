const Bid = require('../models/bidModel');
const Product = require('../models/productModel');

exports.makeBid = async (req, res) => {
  const { amount, bidderId, productId } = req.body;

  try {
    const newBid = new Bid({ amount, bidderId, productId });
    await newBid.save();

    // Update the product with the new bid
    const product = await Product.findById(productId);
    product.bids.push(newBid._id);
    await product.save();

    // Notify seller (via WebSocket)
    const io = req.app.get('io');
    io.to(product.sellerId.toString()).emit('newBid', { productId, bidderId });

    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ error: 'Failed to make a bid' });
  }
};

exports.acceptBid = async (req, res) => {
  const { bidId, productId, sellerId } = req.body;

  try {
    const bid = await Bid.findById(bidId);
    bid.accepted = true;
    await bid.save();
console.log(bid)
    const product = await Product.findById(productId);
    if (product.sellerId.toString() === sellerId) {
      // Notify both users (via WebSocket)
      const io = req.app.get('io');
      io.to(bid.bidderId.toString()).emit('bidAccepted', { productId, sellerId });
      io.to(sellerId.toString()).emit('bidAccepted', { productId,bidderId: bid.bidderId });

      res.status(200).json({ message: 'Bid accepted', bid });
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
