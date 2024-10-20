const Bid = require('../models/bidModel');
const Product = require('../models/productModel');
const logger = require('../utils/logger');

exports.makeBid = async (req, res) => {
  const { amount, bidderId, productId } = req.body;

  try {
    // Step 1: Create the bid
    const newBid = new Bid({ amount, bidderId, productId });
    await newBid.save();

    // Step 2: Find the product
    const product = await Product.findById(productId);
    if (!product) {
      logger.error(`Product not found: ${productId}`);
      return res.status(404).json({ error: 'Product not found' });
    }

    logger.info(`Product found: ${product.title}, id: ${productId}`);

    // Step 3: Add the bid to the product
    product.bids.push(newBid._id);
    await product.save();

    // Step 4: Check if product has a valid sellerId
    if (!product.sellerId) {
      logger.error(`Product does not have a sellerId: ${productId}`);
      return res.status(400).json({ error: 'Product does not have a sellerId' });
    }

    logger.info(`Seller ID: ${product.sellerId}`);

    // Step 5: Notify the seller about the new bid (via WebSocket)
    const io = req.app.get('io');
    if (!io) {
      logger.error('Socket.IO is not initialized');
      return res.status(500).json({ error: 'Socket.IO not initialized' });
    }

    try {
      // Get the seller's socket ID from the userSockets map

      const sellerSocketId =(product.sellerId.toString());

      if (!sellerSocketId) {
        logger.warn(`Seller with ID ${product.sellerId} is not connected`);
        // Instead of returning an error, we'll just skip the real-time notification
        // and continue with the bid process
      } else {
        // Emit the new bid event to the seller
        io.of('/ws').to(sellerSocketId).emit('newBid', { productId, bidderId });
        logger.info(`Seller notified: ${product.sellerId}`);
      }

    } catch (error) {
      logger.error('Error notifying seller about new bid:', error);
      // Instead of returning an error, we'll log it and continue
    }

    // Step 6: Send the successful response to the client
    res.status(201).json(newBid);
  } catch (error) {
    logger.error('Error making a bid:', error);
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
