import { io } from 'socket.io-client';

let socket;

export const connectSocket = (userId) => {
  socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('join', { userId });
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.close();
};

export const sendMessage = (message) => {
  console.log("message",message)
  if (socket) socket.emit('sendMessage', message);
};

export const onMessageReceived = (callback) => {
  if (socket) socket.on('message', callback);
};
