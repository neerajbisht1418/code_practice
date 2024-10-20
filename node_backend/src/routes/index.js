const express = require('express');
const exampleRoutes = require('./exampleRoutes');
const chatRoutes = require("./chatRoutes")
const authRoutes = require("./authRoutes")
const productRoutes = require("./productRoutes")
const bidRoutes = require('./bidRoutes')
const messageRoutes = require("./messageRoutes")

const router = express.Router();

router.get('/', (req, res) => {
    res.json("hello neeraj");
  });

router.use('/examples', exampleRoutes);
router.use('/chat', chatRoutes);
router.use('/auth', authRoutes);
router.use('/product',productRoutes)
router.use('/bid',bidRoutes)
router.use('/message',messageRoutes)


// Add other route groups here as needed
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

module.exports = router;