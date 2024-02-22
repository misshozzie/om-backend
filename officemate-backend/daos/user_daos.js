// const { client } = require("../client/mongo");

// /**
//  * Validates user data.
//  * @param {Object} userData The user data to validate.
//  * @returns {Object} An object with two properties: isValid and errors.
//  */
// function validateUserData(userData) {
//     const errors = [];
//     if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
//         errors.push('Name is required and must be a string.');
//     }

//     if (!userData.email || typeof userData.email !== 'string' || !/^\S+@\S+\.\S+$/.test(userData.email)) {
//         errors.push('A valid email is required.');
//     }

//     // Basic password validation: non-empty string. You might want to enforce more rules (length, complexity)
//     if (!userData.password || typeof userData.password !== 'string' || userData.password.length < 6) {
//         errors.push('Password is required and must be at least 6 characters long.');
//     }

//     // Optionally validate other fields (salt, iterations, accountType) based on your requirements

//     return {
//         isValid: errors.length === 0,
//         errors,
//     };
// }

// async function createUser(userData) {
//     const validation = validateUserData(userData);
//     if (!validation.isValid) {
//         // Return or throw an error based on your application's error handling strategy
//         return { success: false, errors: validation.errors };
//     }

//     const db = getDb();
//     try {
//         const result = await db.collection('users').insertOne(userData);
//         return { success: true, userId: result.insertedId };
//     } catch (error) {
//         // Handle database errors (e.g., duplicate emails) based on your needs
//         console.error('Error creating user:', error);
//         return { success: false, errors: ['Failed to create user due to a server error.'] };
//     }
// }

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
