var express = require('express');
var router = express.Router();

const userController = require("../controllers/user_controller")
/* GET users listing. */

router.post('/create',userController.createUser)
router.get('/all',userController.getUsers)
router.post('/login',userController.loginUser)
router.delete("/:id", userController.deleteUser);
router.patch("/update", userController.updateUser);

module.exports = router;
