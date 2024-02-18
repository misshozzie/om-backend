const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userCollection } = require("../../client/mongo");

exports.createUser = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User created successfully", userId: newUser.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userCollection.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id, email }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your actual secret
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, username } = req.body;
  try {
    const result = await userCollection.updateOne({ _id: userId }, { $set: { email, username } });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or data unchanged" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
