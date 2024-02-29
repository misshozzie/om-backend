var express = require("express");
var router = express.Router();
const tasksController = require("../controllers/task_controller");
/* GET users listing. */
const auth = require("../middlewares/security");

router.post("/create", auth.checkJWT, tasksController.newTask);

// /* === ROUTE GET All TASK === */
router.get("/note/:id", auth.checkJWT, tasksController.getAllTasksOfNote);

router.get("/one/:id", auth.checkJWT, tasksController.getOneTask);

// /* === ROUTE UPDATE NOTE === */
router.patch("/:id", auth.checkJWT, tasksController.updateTask);

// /* === ROUTE DELETE NOTE === */
router.delete("/:id", auth.checkJWT, tasksController.deleteTask);

module.exports = router;
