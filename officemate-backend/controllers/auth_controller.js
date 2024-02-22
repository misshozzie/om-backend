const bcrypt = require('bcrypt');
const _ = require('lodash');
const asyncHandler = require("../middlewares/async_handler");
const { User } = require("../daos/user_daos");

function validateLogin(body) {
    const errors = [];
    if (!body.email) errors.push("Email is required");
    if (!body.password) errors.push("Password is required");
    return { isValid: errors.length === 0, errors };
  }

  const createUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ status: false, message: "Email and password are required." });
      }
      let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ status: false, message: "Email already exists." });
  }

  // Assuming hashing and user creation logic remains the same
  let newUser = new User(_.pick(req.body, ["username", "email", "password"]));
  // Save newUser after hashing password as needed
  // Respond with success or error
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Manual validation
  if (!email || !password) {
    return res.status(400).send({ status: false, message: "Email and password are required." });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ status: false, message: "User not found." });
  }

  // Assuming password verification logic remains the same
  // Respond with success or error
});

/* === Update profile === */
const updateUser = asyncHandler(async (req, res) => {
    try {
      //Find the user by ID
      let user = await User.findOne({ email: req.body.email, username: req.body.username });
  
      if (!user) {
        return res
          .status(404)
          .send({ status: false, message: "User not found." });
      }
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
  
      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        user.salt = req.body.salt; 
        user.iterations = req.body.iterations;
      }
  
      await user.save();
  
      const userWithoutPassword = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };
      console.log("USER SAVED")
      return res.status(200).send({
        status: true,
        message: "User updated successfully",
        user: userWithoutPassword,
      });
    } catch (err) {
      console.log(err);
    }
  });

/* === Logout === */
const logout = asyncHandler(async (req, res) => {
    res.cookie("user", null).send("Successfully logout");
  });

// Export functions
module.exports = { createUser, loginUser, logout, updateUser };