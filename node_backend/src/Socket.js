const { saveMessage } = require('./services/chatService');

const initSocket = (io) => {
  io.use((socket, next) => {
    // Here you would implement your authentication logic
    // For example, checking a token from socket.handshake.auth
    // If authentication fails, call next(new Error("Authentication error"));
    // For now, we'll just pass through
    next();
  });

  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('initiate_chat', ({ userId, sellerId }) => {
      io.to(sellerId).emit('chat_request', { userId });
    });

    socket.on('accept_invitation', ({ userId, sellerId }) => {
      io.to(userId).emit('invitation_accepted', { sellerId });
    });

    socket.on('send_message', async ({ senderId, receiverId, message }) => {
      try {
        const chatMessage = await saveMessage(senderId, receiverId, message);
        io.to(receiverId).emit('receive_message', chatMessage);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('error', { message: 'Failed to save message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
};

module.exports = { initSocket };