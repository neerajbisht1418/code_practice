const Chat = require('../models/Chat');

const saveMessage = async (senderId, receiverId, message,productId,timestamp) => {
  const chatMessage = new Chat({
    senderId,
    receiverId,
    message,
    productId,
    timestamp
  });
  await chatMessage.save();
  return chatMessage;
};

const getChatHistory = async (userId, sellerId,productId) => {
  return await Chat.find({
    $or: [
      { senderId: userId, receiverId: sellerId , productId:productId},
      { senderId: sellerId, receiverId: userId,productId:productId }
    ]
  }).sort({ timestamp: 1 });
};

module.exports = { saveMessage, getChatHistory };
