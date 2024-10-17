const express = require('express');
const exampleRoutes = require('./exampleRoutes');

const router = express.Router();

router.use('/examples', exampleRoutes);

// Add other route groups here as needed
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

module.exports = router;