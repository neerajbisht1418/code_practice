const socketIO = require('socket.io');
const users = {};

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', ({ userId }) => {
      users[userId] = socket.id;
    });

    socket.on('disconnect', () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        delete users[userId];
      }
    });
  });

  return io;
};

module.exports = { initializeSocket };
