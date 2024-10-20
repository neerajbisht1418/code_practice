const express = require('express');
const { createProduct } = require('../controllers/productController');

const router = express.Router();

router.post('/product', createProduct);

module.exports = router;
