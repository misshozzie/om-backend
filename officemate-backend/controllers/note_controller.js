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
  //const username = req.params.username;
  try {
    const noteData = await noteModel.getAll(req.user);
    console.log(noteData);
    res.json(noteData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === NEW NOTE === */
async function newNote (req, res) {
//const newNote = async (req, res) => {
  try {
      const { Title, Date, Description, isEvent } = req.body;
      const newNote = { Title, Date, Description,isEvent };;
      //const result = await noteModel.insertOne(username, newNote);
      const result = await noteModel.createOne(req.user, newNote);
      console.log(result);
      //if (result.insertedId) {
        if (result.result) {
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
    // const result = await noteModel.deleteOne({
    //   _id: new ObjectId(noteId),
    // });
    const result = await noteModel.deleteOne(req.user,noteId);
    //if (result.deletedCount === 0) {
      res.send(result);
    //   res.status(404).json({ error: "Note not found." });
    // } else {
    //   res.json({ message: "Note deleted successfully" });
    // }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

/* === GET ONE NOTE === */
async function getOneNote(req, res) {
  // const username = req.params.username;
  // const noteId= req.query.noteId;
  const {id} = req.params;
  try {
    // const noteData = await noteModel.getOne(username, noteId);
    const noteData = await noteModel.getOne(id);
    res.json(noteData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === UPDATE ONE NOTE === */
async function updateOneNote(req, res) {
  //const username = req.params.username;
  //const noteId = req.query.noteId;
  const noteId = req.params.id;
  const body = req.body;
  try {
    //const noteData = await noteModel.updateOne(username, noteId, body);
    const noteData = await noteModel.updateOne(noteId, body);
    res.json(noteData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}




