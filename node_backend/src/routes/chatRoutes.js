const express = require('express');
const { getChatHistory, saveChatMessage } = require('../controllers/chatController');
const router = express.Router();

router.get('/:userId/:sellerId/:productId',getChatHistory );
router.post('/save',saveChatMessage)

module.exports = router;
