const express = require("express");
const userController = require("../../controllers/Users/user_controller");
const securityMiddleware = require("../../middlewares/security");
const router = express.Router();

router.get("/", securityMiddleware.checkPermission, userController.getUsers);
router.get("/login", userController.getLoginDetails);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.post("/create", userController.createUser); // add this route
router.patch("/update", userController.updateUser);

module.exports = router;
