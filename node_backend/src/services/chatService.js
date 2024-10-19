const Chat = require('../models/Chat');

const saveMessage = async (senderId, receiverId, message) => {
  const chatMessage = new Chat({
    senderId,
    receiverId,
    message
  });
  await chatMessage.save();
  return chatMessage;
};

const getChatHistory = async (userId, sellerId) => {
  return await Chat.find({
    $or: [
      { senderId: userId, receiverId: sellerId },
      { senderId: sellerId, receiverId: userId }
    ]
  }).sort({ timestamp: 1 });
};

module.exports = { saveMessage, getChatHistory };
