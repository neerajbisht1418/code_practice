const { getChatHistory, saveMessage } = require('../services/chatService');

exports.getChatHistory = async (req, res, next) => {
  try {
    const { userId, sellerId } = req.params;
    const chatHistory = await getChatHistory(userId, sellerId);
    res.status(200).json({ success: true, data: chatHistory });
  } catch (error) {
    console.error('Error in getChatHistory controller:', error);
    next(error);
  }
};

exports.saveChatMessage = async (req, res, next) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const savedMessage = await saveMessage(senderId, receiverId, message);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error in saveChatMessage controller:', error);
    next(error);
  }
};