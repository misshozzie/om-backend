const mongoose = require('mongoose');

// Define the User schema with validation
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A valid email is required.'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required and must be at least 6 characters long.'],
    minlength: 6,
  },
  salt: String,
  iterations: Number,
  token: String,
  expire_at:Date,
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],
  calendar: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar',
  }],
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'], 
  },
  username: {
    type: String,
    required: [true, 'Name is required and must be a string.'],
  },
});

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

class UserDao {
  // Method to validate user data (could be extended or modified as needed)
  validateUserData(userData) {
    const errors = [];
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Method to create a single user
  async createUser(userData) {
    const validation = this.validateUserData(userData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    try {
      const user = await User.create(userData);
      return { success: true, userId: user._id };
    } catch (error) {
      console.error('Error creating user:', error);
      const errors = error.errors ? Object.values(error.errors).map(err => err.message) : ['Failed to create user due to a server error.'];
      return { success: false, errors };
    }
  }
}

const userDao = new UserDao();
module.exports = userDao;
