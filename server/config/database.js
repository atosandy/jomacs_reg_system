const { Pool } = require('pg');
require('dotenv').config();

// Database configuration with SSL for production
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20
});

// Test database connection with better error handling
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database successfully');
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Host: ${process.env.DB_HOST}`);
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Connection details:');
    console.error(`Host: ${process.env.DB_HOST}`);
    console.error(`Port: ${process.env.DB_PORT}`);
    console.error(`Database: ${process.env.DB_NAME}`);
    console.error(`User: ${process.env.DB_USER}`);
    throw err;
  }
};

// Call test connection
testConnection();

module.exports = pool;
