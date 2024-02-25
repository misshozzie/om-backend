const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");


/* === ROUTE USER LOGIN CREDENTIALS === */
router.get("/login", userController.getLoginDetails);

/* === ROUTE USER LOGIN === */
router.post("/login", userController.loginUser);

/* === ROUTE USER LOGOUT === */
router.post("/logout", userController.logoutUser);

/* === ROUTE USER SIGNUP === */
router.post("/create", userController.createUser);

/* === ROUTE USER UPDATE === */
router.patch("/update", userController.updateUser);

/* === ROUTE USER UPDATE === */
router.delete("/adminPage", userController.deleteUser);

module.exports = router;