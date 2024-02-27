var express = require("express");
var router = express.Router();
const notesController = require("../controllers/note_controller");
/* GET users listing. */
const auth = require("../middlewares/security");

router.post("/create", auth.checkJWT, notesController.newNote);

// /* === ROUTE GET ONE NOTE === */
router.get("/all", auth.checkJWT, notesController.getAllNotes);

// /* === ROUTE GET ONE NOTE === */
router.get("/one/:id", auth.checkJWT, notesController.getOneNote);

// /* === ROUTE UPDATE NOTE === */
router.patch("/:id", auth.checkJWT, notesController.updateOneNote);

// /* === ROUTE DELETE NOTE === */
router.delete("/:id", auth.checkJWT, notesController.deleteNote);
module.exports = router;
