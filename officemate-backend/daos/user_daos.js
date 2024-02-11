const mongoose = require("mongoose");
const Joi = require('joi');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    iterations: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
    },
    expire_at: {
      type: Number, 
    },
    accountType: {
      type: String,
      enum: ["basic", "premium"],
      default: "basic",
    },
    notes: {
      notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    },
  },
  { timestamps: true }
);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(), 
        password: Joi.string().required(),
        email: Joi.string().required(),
        salt: Joi.string().required(),
        iterations: Joi.number().required(),
    });

    return schema.validate(user);
}

const User = mongoose.model("User", userSchema); 

module.exports = { User, validateUser };
