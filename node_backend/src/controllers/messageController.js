const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
  const { message, senderId, receiverId } = req.body;

  try {
    const newMessage = new Message({ message, senderId, receiverId });
    await newMessage.save();

    // Notify receiver (via WebSocket)
    const io = req.app.get('io');
    io.to(receiverId.toString()).emit('message', newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
