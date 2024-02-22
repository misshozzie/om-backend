const express = require("express");
const noteController = require("../controllers/note_controller");
const router = express.Router();
const securityMiddleware = require("../middlewares/security");

// Note Routes
router.get('/', (req, res) => {
    res.send('User route is working');
router.post("/notes/create", securityMiddleware.checkLogin, noteController.createNote);
router.get("/notes", securityMiddleware.checkLogin, noteController.getAllNotes);
router.get("/notes/:id", securityMiddleware.checkLogin, noteController.getNoteById);
router.delete("/notes/:id", securityMiddleware.checkLogin, noteController.deleteNote);
router.put("/notes/update/:id", securityMiddleware.checkLogin, noteController.updateNote);
router.put("/notes/task/update/:id", securityMiddleware.checkLogin, noteController.updateNoteTasks);
});

module.exports = router;