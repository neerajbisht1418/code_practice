const express = require('express');
const exampleRoutes = require('./exampleRoutes');
const chatRoutes = require("./chatRoutes")
const authRoutes = require("./authRoutes")

const router = express.Router();

router.get('/', (req, res) => {
    res.json("hello neeraj");
  });

router.use('/examples', exampleRoutes);
router.use('/chat', chatRoutes);
router.use('/auth', authRoutes);


// Add other route groups here as needed
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

module.exports = router;