const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task_controller");
const securityMiddleware = require("../middlewares/security");

/* === ROUTE GET ALL TASK === */
router.get(
  "/notesid/:taskid",
  securityMiddleware.checkLogin,
  taskController.getAllTasks
);

/* === ROUTE NEW TASK === */
router.post(
    "/notesid/:taskid",
  securityMiddleware.checkLogin,
  taskController.newTask
);

/* === ROUTE UPDATE TASK === */
router.patch(
"/notesid/:taskid",
  securityMiddleware.checkLogin,
  taskController.updateTasks
);

/* === ROUTE DELETE TASK === */
router.delete(
"/notesid/:taskid",
  securityMiddleware.checkLogin,
  taskController.deleteTask
);

module.exports = router;
