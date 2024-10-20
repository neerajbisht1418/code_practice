const socketIO = require('socket.io');
const logger = require('../utils/logger');

const users = {};

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Use the "/ws" namespace for socket connections
  const chatNamespace = io.of('/ws');

  chatNamespace.on('connection', (socket) => {
    logger.info('A user connected to /ws', socket.id);

    // Handle user joining
    socket.on('join', ({ userId }) => {
      users[userId] = socket.id;
      logger.info(`User ${userId} joined /ws`);
    });

    // Handle sending a message
    socket.on('sendMessage', async (message) => {
      logger.info('Message received:', message);
      const receiverSocketId = users[message.receiverId];

      try {
        // Save message to database (assuming saveMessage function exists)
        // const savedMessage = await saveMessage(message);

        if (receiverSocketId) {
          chatNamespace.to(receiverSocketId).emit('message', message);
        }
        // Send the message back to the sender as well for confirmation
        socket.emit('message', message);
      } catch (error) {
        logger.error('Error saving/sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        delete users[userId];
        logger.info(`User ${userId} disconnected from /ws`);
      }
    });
  });
};

module.exports = { initializeSocket };
