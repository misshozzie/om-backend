// user_models.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
