const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  const { title, description, price, sellerId } = req.body;

  try {
    const newProduct = new Product({ title, description, price, sellerId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post product' });
  }
};
