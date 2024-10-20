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


// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('sellerId', 'username email')
      .populate('bids');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
 };
 
 // Get product by ID
 exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('sellerId', 'username email')
      .populate('bids');
      
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
 };
