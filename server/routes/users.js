const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/users/profile (Protected)
router.get('/profile', authenticateToken, getProfile);

// PUT /api/users/profile (Protected)
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;