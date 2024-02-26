const userModel= require("../models/users");
const bcrypt = require("bcrypt");


module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  logoutUser,
  getLoginDetails
};

/*=== CREATE USER === */
async function createUser(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const userData = await userModel.createUser(req.body);
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

/*=== LOGIN === */
async function loginUser(req, res) {
  try {
    const token = await userModel.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

/*=== FETCH ALL THE USERS === */
async function getUsers(req, res) {
  try {
    const users = await userModel.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}

/*=== UPDATE USER PW === */
async function updateUser(req, res) {
  try {
    const userData = await userModel.updateUser(req.body);
    res.json(userData);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    // res.render('movies/new', { errorMsg: err.message }); SKIP old code
    res.status(500).json({ errorMsg: err.message });
  }
}

/*=== DELETE USER === */
async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const result = await userModel.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}
/*=== LOGOUT USER === */
async function logoutUser(req, res) {
  try {
    const result = await userModel.logoutUser(req.body);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

/*=== GET LOGIN DETAILS === */
async function getLoginDetails(req, res) {
  try {
    const loginDetails = await userModel.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

