const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Import models and routes
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// cors configuration
const corsOperations = {
  origin: process.env.NODE_ENV === 'production' ? [process.env.FRONTEND_URL] : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus:200
};



// Middleware
app.use(helmet()); // Security headers
app.use(cors(corsOperations)); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PERN User Management API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Create users table if it doesn't exist
    await User.createTable();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;