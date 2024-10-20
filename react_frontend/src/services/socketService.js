import { io } from 'socket.io-client';
const socketUrl = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_LOCAL_BACKEND_URL:import.meta.env.VITE_LIVE_BACKEND_URL

let socket;

export const connectSocket = (userId) => {
  socket = io(socketUrl);

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
  if (socket) socket.emit('sendMessage', message);
};

export const onMessageReceived = (callback) => {
  if (socket) socket.on('message', callback);
};
