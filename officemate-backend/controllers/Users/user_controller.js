const modelUsers = require("../../models/Users/user_models");

module.exports = {
    getUsers,
    getLoginDetails,
    loginUser,
    createUser,
    logoutUser,
    updateUser
}

async function getUsers(req, res) {
    try {
        const userData = await modelUsers.getUsers(req.query);
        res.json({users: userData})
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function getLoginDetails(req, res) {
    try {
        const loginDetails = await modelUsers.getLoginDetails(req.query);
        if (loginDetails.success != true) {
          res.status(400).json({errorMsg: loginDetails.error})
          return
        }
        res.json(loginDetails.data)
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
  }

async function loginUser(req, res) {
    try {
        const token = await modelUsers.loginUser(req.body);
        console.log(token);
        if (!token.success) {
          res.status(400).json({errorMsg: token.error})
          return 
        }
        res.json(token.data)
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
  }

  async function createUser(req, res) {
    try {
      const userData = await modelUsers.createUser(req.body);
      res.redirect(userData); //"/users"
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMsg: err.message });
    }
  }

  async function logoutUser(req, res) {
    try {
      const result = await modelUsers.logoutUser(req.body);
      if (!result.success) {
        res.status(400).json({ errorMsg: result.error });
        return;
      }
      res.json(result.data);
    } catch (err) {
      res.status(500).json({ errorMsg: err.message });
    }
  }

  async function updateUser(req, res) {
    try {
      const userData = await modelUsers.updateUser(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMsg: err.message });
    }
  }