const mongoose = require("mongoose");
const { User: usersDao, validateUser } = require("../daos/user_daos");
const utilSecurity = require("../util/security");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers,
  //getLoginDetails,
  loginUser,
  createUser,
  logoutUser,
  updateUser,
  deleteUser
};

/*=== GET USERS ===*/
function getUsers(queryFields) {
  return usersDao.find(queryFields);
}

// /*=== GET LOGIN DETAILS ===*/
// async function getLoginDetails(queryFields) {
//   const loginFields = {
//     username: 1,
//     salt: 1,
//     iterations: 1,
//   };
//   if (!queryFields.hasOwnProperty("email")) {
//     return { success: false, error: "missing email" };
//   }
//   // url decode email '@' -> %40
//   const userEmail = decodeURIComponent(queryFields.email);
//   const loginFieldsRes = await usersDao.findOne(
//     { email: userEmail },
//     loginFields
//   );
//   return { success: true, data: loginFieldsRes };
// }

/*=== LOGIN USER ===*/
async function loginUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  const user = await usersDao.findOne({
    email: body.email,
    //password: body.password,
  });

  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  // if (user == null || Object.keys(user).length == 0) {
    if (user == null || !isPasswordValid) {
    return { success: false, error: "Invalid email/password" };
  }

  console.log(user);
  const jwtPayload = {
    user: user.username,
    email: user.email,
    //is_admin: user.is_admin,
    is_admin: user.role,
  };
  console.log(jwtPayload);
  const token = utilSecurity.createJWT(jwtPayload);
  //const expiry = utilSecurity.getExpiry(token);
  console.log("token to store:", token);
  //console.log("expiry to store:", expiry);

  return { success: true, data: {token,"role": user.role ,"id" : user._id } };
}

//   const result = await usersDao.updateOne(
//     { email: body.email },
//     { token: token, expire_at: expiry }
//   );

//   if (result.modifiedCount > 0) {
//     console.log("Update successful!");
//   } else {
//     console.log("No document was modified.");
//   }

//   return { success: true, data: token };
// }

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

/*=== LOGOUT USER===*/
async function logoutUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  const result = await usersDao.updateOne(
    { email: body.email },
    { token: null, expire_at: null }
  );
  if (result.modifiedCount > 0) {
    console.log("Update successful!");
  } else {
    console.log("No document was modified.");
  }
  return { success: true };
}

/*=== UPDATE USER ===*/
async function updateUser(body) {
  //
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

/*=== DELETE USER ===*/
async function deleteUser(id) {
  const user = await usersDao.findById(id);

  const delUser = await usersDao.deleteOne(user);
  return { success: true, data: delUser };
}