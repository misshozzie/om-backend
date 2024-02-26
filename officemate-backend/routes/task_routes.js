const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/task_controller");
const auth = require("../middlewares/security");

/* === ROUTE GET ALL TASK === */
router.get("/note/:id", auth.checkJWT, tasksController.getAllTasksOfNote);

/* === ROUTE NEW TASK === */
router.post("/create", auth.checkJWT, tasksController.newTask);

// /* === ROUTE UPDATE TASK === */
// router.patch(
//   "/notesid/:taskid",
//   securityMiddleware.checkLogin,
//   taskController.updateTasks
// );

/* === ROUTE GET ONE TASK === */
router.get("/one/:id", auth.checkJWT, tasksController.getOneTask);

/* === ROUTE DELETE TASK === */
router.delete("/notesid/:taskid", auth.checkJWT, tasksController.deleteTask);

module.exports = router;
