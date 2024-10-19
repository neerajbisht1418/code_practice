// socketService.js
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('connect', () => {
  console.log('Socket connected successfully');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log('Attempting to reconnect:', attemptNumber);
});

const initiateChat = (userId, sellerId) => {
  socket.emit('initiate_chat', { userId, sellerId });
};

const acceptInvitation = (userId, sellerId) => {
  socket.emit('accept_invitation', { userId, sellerId });
};

const sendMessage = (senderId, receiverId, message) => {
  socket.emit('send_message', { senderId, receiverId, message });
};

export { socket, initiateChat, acceptInvitation, sendMessage };