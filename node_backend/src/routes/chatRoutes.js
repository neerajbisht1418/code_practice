const express = require('express');
const { getChatHistory, saveChatMessage } = require('../controllers/chatController');
const router = express.Router();

router.get('/:userId/:sellerId',getChatHistory );
router.post('/save',saveChatMessage)

module.exports = router;
