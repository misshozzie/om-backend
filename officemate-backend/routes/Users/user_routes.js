const express = require("express");
const userController = require("../../controllers/Users/user_controller");
const { getCollection } = require("../../client/mongo");
const securityMiddleware = require("../../middlewares/security");
const router = express.Router();

//User Routes

router.get('/', (req, res) => {
    res.send('User route is working');
//router.use('/', indexRouter);
const userCollection = getCollection('user');

router.get("/", securityMiddleware.checkPermission, userController.getUsers);
router.use('/users', usersRouter);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logoutUser);
router.post("/user", userController.createUser);
router.get("/user", userController.getAllUsers);
router.delete("/user/delete/:id", userController.deleteUser);
router.put("/user/update/:id", userController.updateUserPassword);
});

module.exports = router;