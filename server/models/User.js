const pool = require('../config/database');

class User {
  // Create users table
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await pool.query(query);
      console.log('Users table created or already exists');
    } catch (error) {
      console.error('Error creating users table:', error.message);
      throw error;
    }
  }

  // Create a new user
  static async create({ name, email, password }) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;
    
    try {
      const result = await pool.query(query, [name, email, password]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async update(id, { name, email, password }) {
    let query = 'UPDATE users SET ';
    let values = [];
    let setClause = [];
    let paramCount = 1;

    if (name) {
      setClause.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }

    if (email) {
      setClause.push(`email = $${paramCount}`);
      values.push(email);
      paramCount++;
    }

    if (password) {
      setClause.push(`password = $${paramCount}`);
      values.push(password);
      paramCount++;
    }

    query += setClause.join(', ');
    query += ` WHERE id = $${paramCount} RETURNING id, name, email, created_at`;
    values.push(id);

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;