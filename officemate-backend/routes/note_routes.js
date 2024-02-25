const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note_controller");
const securityMiddleware = require("../middlewares/security");

/* === ROUTE GET ALL NOTES === */
router.get(
  "/all/:username",
  securityMiddleware.checkLogin,
  noteController.getAllNotes
);

/* === ROUTE NEW NOTE === */
router.post(
  "/notes/create/:username",
  securityMiddleware.checkLogin,
  noteController.newNote
);

/* === ROUTE GET ONE NOTE === */
router.get(
  "one/:username",
  securityMiddleware.checkLogin,
  noteController.getOneNote
);

/* === ROUTE UPDATE NOTE === */
router.patch(
  "/:username",
  securityMiddleware.checkLogin,
  noteController.updateOneNote
);

/* === ROUTE DELETE NOTE === */
router.delete(
  "/:username",
  securityMiddleware.checkLogin,
  noteController.deleteNote
);

module.exports = router;
