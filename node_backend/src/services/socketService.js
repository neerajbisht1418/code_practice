// services/socketService.js
const socketIO = require('socket.io');
const logger = require('../utils/logger');

const users = {};

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    logger.info('A user connected', socket.id);

    socket.on('join', ({ userId }) => {
      users[userId] = socket.id;
      logger.info(`User ${userId} joined`);
    });

    socket.on('sendMessage', async (message) => {
      logger.info('Message received:', message);
      const receiverSocketId = users[message.receiverId];

      try {
        // Save message to database (assuming you have a saveMessage function)
        // const savedMessage = await saveMessage(message);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit('message', message);
        }
        // Also send back to sender for confirmation
        socket.emit('message', message);
      } catch (error) {
        logger.error('Error saving/sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        delete users[userId];
        logger.info(`User ${userId} disconnected`);
      }
    });
  });
};

module.exports = { initializeSocket };
