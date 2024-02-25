const noteModel = require("../models/notes");

module.exports = {
  newNote,
  getOneNote,
  getAllNotes,
  updateOneNote,
  deleteNote
};

/* === ALL NOTES === */
async function getAllNotes(req, res) {
  const username = req.params.username;
  try {
    const noteData = await noteModel.getAll(username);
    console.log(noteData);
    res.json(noteData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === NEW NOTE === */
async function newNote(req, res) {
  try {
    const { Title, Date, Description, Calendar, Tasks} = req.body;
    const newNote = {
      Title,
      Date,
      Description,
      Calendar,
      Tasks,
    };

    const result = await noteModel.insertOne(newNote);

    if (result.insertedId) {
      res.status(201).json({
        message: "Note created successfully",
        id: result.insertedId,
      });
    } else {
      res.status(500).json({ error: "Failed to create note" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

/* === DELETE NOTE === */
async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const result = await noteModel.deleteOne({
      _id: new ObjectId(noteId),
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Note not found." });
    } else {
      res.json({ message: "Note deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

/* === GET ONE NOTE === */
async function getOneNote(req, res) {
  const username = req.params.username;
  const noteId= req.query.noteId;
  try {
    const noteData = await noteModel.getOne(username, noteId);
    res.json(noteData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === UPDATE ONE NOTE === */
async function updateOneNote(req, res) {
  const username = req.params.username;
  const noteId = req.query.noteId;
  const body = req.body;
  try {
    const noteData = await noteModel.updateOne(username, noteId, body);
    res.json(noteData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}




