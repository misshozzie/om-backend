const eventModel = require("../models/event");

module.exports = { newEvent, deleteEvent, getAllEvents };

/* === GET ALL EVENTS=== */
async function getAllEvents(req, res) {
  const username = req.params.username;
  try {
    const eventData = await eventModel.getAll(username);
    console.log(eventData);
    res.json(eventData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === NEW EVENT == */
async function newEvent(req, res) {
  try {
      const { title, description, start, end } = req.body;
      const newEvent = { title, description, start, end };
      const result = await eventModel.insertOne(newEvent);
      res.status(201).json({
          message: "Event created successfully",
          id: result.insertedId,
      });
  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
  }
};

 /* === DELETE EVENT === */
 async function deleteEvent(req, res) {
  try {
    const eventId = req.params.id;
    const result = await eventModel.deleteOne({
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