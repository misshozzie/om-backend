const express = require("express");
const router = express.Router();
const notesController = require("../controllers/note_controller");
const auth = require("../middlewares/security");

/* === ROUTE CREATE NOTE === */
router.post("/create", auth.checkJWT, notesController.newNote);

/* === ROUTE GET ALL NOTES === */
router.get("/all", auth.checkJWT, notesController.getAllNotes);

/* === ROUTE GET ONE NOTE === */
router.get("one/:id", auth.checkJWT, notesController.getOneNote);

/* === ROUTE UPDATE NOTE === */
router.patch("/:id", auth.checkJWT, notesController.updateOneNote);

/* === ROUTE DELETE NOTE === */
router.delete("/:id", auth.checkJWT, notesController.deleteNote);

module.exports = router;
