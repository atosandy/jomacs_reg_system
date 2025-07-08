const bcrypt = require('bcrypt');
const User = require('../models/User');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email, password } = req.body;

    // Validate input - at least one field should be provided
    if (!name && !email && !password) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (name, email, or password) is required for update'
      });
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // If email is being updated, check if it's already taken by another user
    if (email && email !== existingUser.email) {
      const emailExists = await User.findByEmail(email);
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email is already taken by another user'
        });
      }
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    // Hash password if provided
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    // Update user
    const updatedUser = await User.update(userId, updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          created_at: updatedUser.created_at
        }
      }
    });

  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};