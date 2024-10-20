const express = require('express');
const { makeBid, acceptBid } = require('../controllers/bidController');

const router = express.Router();

router.post('/bid', makeBid);
router.post('/bid/accept', acceptBid);

module.exports = router;
