const mongoose = require("mongoose");
const { User: usersDao, validateUser } = require("../daos/user_daos");
const utilSecurity = require("../util/security");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers,
  loginUser,
  updateUser,
  createUser,
  deleteUser
};

/*=== GET USERS ===*/
function getUsers(queryFields) {
  return usersDao.find(queryFields);
}

/*=== LOGIN USER ===*/
async function loginUser(body) {
  // console.log(body);
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  const user = await usersDao.findOne({
    email: body.email,
  });

  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (user == null || !isPasswordValid) {
    return { success: false, error: "Invalid email/password" };
  }

  console.log(user);
  const jwtPayload = {
    user: user._id,
    email: user.email,
    is_admin: user.role,
  };
  console.log(jwtPayload);
  const token = utilSecurity.createJWT(jwtPayload);
  // const expiry = utilSecurity.getExpiry(token);
  console.log("token to store:", token);
  // console.log("expiry to store:", expiry);

  return { success: true, data: {token,"role": user.role ,"id" : user._id } };
}

/*=== CREATE USER ===*/
async function createUser(body) {
  
  const user = await usersDao.findOne({ email: body.email });
  console.log(user);
  if (user) {
    return { success: false, error: "user already exist" };
  }
  const newUser = await usersDao.create(body);
  return { success: true, data: newUser };
}

async function deleteUser(id) {
  const user = await usersDao.findById(id);
  console.log(user);
  const delUser = await usersDao.deleteOne({_id: id});
  return { success: true, data: delUser };
}

async function updateUser(body) {
  
  const user = await usersDao.findOne({ email: body.email });
  console.log("user", user);
  if (!user) {
    return { success: false, error: "user does not exist" };
  } else if (user.password !== body.passwordold) {
    console.log("user.password", user.password);
    console.log("body.passwordold", body.passwordold);
    return { success: false, error: "old password incorrect" };
  } else if (user.password === body.passwordnew) {
    return { success: false, error: "new password same as old" };
  }

  user.password = body.password;
  user.salt = body.salt;
  user.iterations = body.iterations;

  await user.save();
  return { success: true, data: "password updated" };
}