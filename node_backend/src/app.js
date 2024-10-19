const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { NODE_ENV, PORT, APP_VERSION } = require('./config/environment');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const connectDB = require('./db/mongoose');
const logger = require('./utils/logger');

const http = require('http');
const socketIO = require('socket.io');

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => logger.info('MongoDB connected successfully'))
  .catch((err) => {
    logger.error('MongoDB connection failed', err);
    process.exit(1); // Exit process if DB connection fails
  });

// Middleware
app.use(helmet());

// CORS for regular Express routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this frontend URL
  methods: ['GET', 'POST'],        // Restrict allowed methods
  credentials: true                // Allow credentials (optional)
}));
app.use(express.json());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.use(`/api/${APP_VERSION}`, routes);

// Global Error Handler Middleware
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Configure CORS specifically for Socket.IO
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173',  // Allow only the frontend URL for Socket.IO
    methods: ['GET', 'POST'],         // Restrict allowed methods for Socket.IO
    credentials: true                 // Allow credentials (if you're using them)
  }
});

// Socket.IO logic
const users = {};

io.on('connection', (socket) => {
  logger.info('A user connected', socket.id);

  socket.on('join', ({ userId }) => {
    users[userId] = socket.id;
    logger.info(`User ${userId} joined`);
  });

  socket.on('sendMessage', async (message) => {
    logger.info('Message received:', message);
    const receiverSocketId = users[message.receiver];
    
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
    const userId = Object.keys(users).find(key => users[key] === socket.id);
    if (userId) {
      delete users[userId];
      logger.info(`User ${userId} disconnected`);
    }
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection:', err);
  server.close(() => process.exit(1)); // Graceful shutdown
});

// Start server
server.listen(PORT, () => {
  logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;