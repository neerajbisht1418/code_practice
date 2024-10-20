const express = require('express');
const { makeBid, acceptBid } = require('../controllers/bidController');

const router = express.Router();

router.post('/', makeBid);
router.post('/accept', acceptBid);

module.exports = router;
