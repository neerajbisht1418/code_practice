const socketIO = require('socket.io');
const logger = require('../utils/logger');

const users = new Map(); // Track user sockets using a Map

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Create a namespace "/ws" for chat
  const chatNamespace = io.of('/ws');

  chatNamespace.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    logger.info(`New connection attempt for user ${userId} with socket ID: ${socket.id}`);

    // User joins the namespace
    handleUserJoin(socket, userId);

    // Handle message sending
    socket.on('sendMessage', (message) => handleSendMessage(socket, chatNamespace, message));

    // Handle bid acceptance
    socket.on('acceptBid', ({ productId, bid }) => handleAcceptBid(socket, chatNamespace, productId, bid));

    // Handle notifications
    socket.on('sendNotification', (notification) => handleSendNotification(chatNamespace, notification));

    // Handle user disconnect
    socket.on('disconnect', () => handleUserDisconnect(socket));
  });

  return io;
};

// Handle when a user joins the namespace
const handleUserJoin = (socket, userId) => {
  if (!userId) {
    logger.warn(`User tried to join without a userId. Socket ID: ${socket.id}`);
    socket.emit('error', { message: 'User ID is required to join the chat.' });
    return;
  }

  // Remove any existing socket for this user
  if (users.has(userId)) {
    const oldSocketId = users.get(userId);
    logger.info(`Replacing old socket connection for user ${userId}. Old socket ID: ${oldSocketId}`);
    const oldSocket = chatNamespace.sockets.get(oldSocketId);
    if (oldSocket) {
      oldSocket.disconnect(true);
    }
  }

  // Add user to the users Map
  users.set(userId, socket.id);

  // Log both userId and socket.id
  logger.info(`User ${userId} joined /ws with socket ID: ${socket.id}`);
  logger.info(`Current active connections: ${users.size}`);

  // Emit a confirmation to the client
  socket.emit('connectionConfirmed', { userId, socketId: socket.id });
};

// Handle sending messages between users
const handleSendMessage = async (socket, chatNamespace, message) => {
  const { senderId, receiverId, content } = message;
  
  if (!senderId || !receiverId || !content) {
    logger.warn('Message sending failed due to missing senderId, receiverId, or content');
    socket.emit('error', { message: 'Message content, sender ID, and receiver ID are required.' });
    return;
  }

  const receiverSocketId = users.get(receiverId);
  
  try {
    // Emit message to receiver if they are connected
    if (receiverSocketId) {
      chatNamespace.to(receiverSocketId).emit('message', message);
      logger.info(`Message sent from user ${senderId} to ${receiverId}`);
    } else {
      logger.warn(`Receiver ${receiverId} is not connected. Message not delivered.`);
    }

    // Emit message back to sender for confirmation
    socket.emit('messageSent', message);
  } catch (error) {
    logger.error('Error sending message:', error);
    socket.emit('error', { message: 'Failed to send message, please try again.' });
  }
};

// Handle bid acceptance event
const handleAcceptBid = (socket, chatNamespace, productId, bid) => {
  const { bidderId } = bid;

  if (!productId || !bidderId) {
    logger.warn('Bid acceptance failed due to missing productId or bidderId');
    socket.emit('error', { message: 'Product ID and Bidder ID are required to accept a bid.' });
    return;
  }

  const receiverSocketId = users.get(bidderId);
  
  if (!receiverSocketId) {
    logger.warn(`Bidder ${bidderId} is not connected. Cannot send bid acceptance notification.`);
    socket.emit('error', { message: `Bidder ${bidderId} is not connected.` });
    return;
  }

  // Notify the bidder that their bid was accepted
  chatNamespace.to(receiverSocketId).emit('bidAccepted', { productId, bidderId });
  logger.info(`Bid for product ${productId} accepted by seller. Notified bidder ${bidderId}`);
};

// Handle sending notifications
const handleSendNotification = (chatNamespace, notification) => {
  const { userId } = notification;

  if (!userId || !notification.message) {
    logger.warn('Notification sending failed due to missing userId or message');
    return;
  }

  const receiverSocketId = users.get(userId);
  
  if (!receiverSocketId) {
    logger.warn(`User ${userId} is not connected. Cannot send notification.`);
    return;
  }

  chatNamespace.to(receiverSocketId).emit('notification', notification);
  logger.info(`Notification sent to user ${userId}`);
};

// Handle user disconnect event
const handleUserDisconnect = (socket) => {
  let disconnectedUserId = null;
  for (const [userId, socketId] of users.entries()) {
    if (socketId === socket.id) {
      disconnectedUserId = userId;
      break;
    }
  }
  
  if (disconnectedUserId) {
    users.delete(disconnectedUserId);
    logger.info(`User ${disconnectedUserId} disconnected from /ws with socket ID: ${socket.id}`);
    logger.info(`Remaining active connections: ${users.size}`);
  } else {
    logger.warn(`User disconnect detected, but no associated userId for socket ID: ${socket.id}`);
  }
};

module.exports = { initializeSocket };