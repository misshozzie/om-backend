const { notesCollection } = require("../client/mongo"); // Adjust the path as necessary
exports.createNote = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const newNote = await notesCollection.insertOne({ title, content, userId });
    res.status(201).json({ message: "Note created successfully", noteId: newNote.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await notesCollection.find().toArray();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await notesCollection.findOne({ _id: id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await notesCollection.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
