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
const { initSocket } = require('./Socket');

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

// Initialize Socket.IO
initSocket(io);

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
