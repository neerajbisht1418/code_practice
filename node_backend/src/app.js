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

// Import the socket service
const { initializeSocket } = require('./services/socketServiceTwo');

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

// CORS configuration
app.use(
  cors({
    origin: NODE_ENV === 'production' ? 'https://your-production-domain.com' : true, // Allow specific domains in production
    methods: ['GET', 'POST'], // You can adjust the allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(express.json());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.get('/', (req, res) => {
  res.json("Hello Neeraj");
});
app.use(`/api/${APP_VERSION}`, routes);

// Global Error Handler Middleware
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);
app.set('io', io);

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
