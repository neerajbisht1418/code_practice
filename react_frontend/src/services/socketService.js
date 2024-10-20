import { io } from 'socket.io-client';

// Use appropriate environment variables for URLs
const socketUrl = import.meta.env.VITE_NODE_ENV === "development" 
  ? import.meta.env.VITE_LOCAL_BACKEND_URL 
  : import.meta.env.VITE_LIVE_BACKEND_URL;

let socket;

export const connectSocket = (userId) => {
  // Connect to the WebSocket namespace '/ws'
  console.log("userId", userId)
  socket = io(`${socketUrl}/ws`, {
    query: { userId }  // Send userId as part of the query params when connecting
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('connect_error', (err) => {
    console.error('WebSocket connection failed:', err);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.close();
    console.log('Disconnected from WebSocket server');
  }
};

export const sendMessage = (message) => {
  if (socket) {
    socket.emit('sendMessage', message);
    console.log('Message sent:', message);
  } else {
    console.error('Socket is not connected');
  }
};

export const onMessageReceived = (callback) => {
  if (socket) {
    socket.on('message', callback);
  } else {
    console.error('Socket is not connected');
  }
};

export const onBidAccepted = (callback) => {
  if (socket) {
    socket.on('bidAccepted', callback);
  } else {
    console.error('Socket is not connected');
  }
};

export const onNotificationReceived = (callback) => {
  if (socket) {
    socket.on('notification', callback);
  } else {
    console.error('Socket is not connected');
  }
};
