const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    match: [/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'],
  },
  accountType: {
    type: String,
    enum: ["basic", "premium"],
    default: "basic",
  },
  trips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
  }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    role: Joi.string().valid("admin", "user").required(),
    salt: Joi.string().required(),
    iterations: Joi.number().required(),
  });

  const User = mongoose.model("User", userSchema);
}

module.exports = { User };