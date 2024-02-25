const taskModel = require("../models/tasks");

module.exports = {
  newTask,
  showTasks,
  updateTasks,
  deleteTask,
  updateTasks,
};

/* === NEW TASK === */
async function newTask(req, res) {
    try {
      const { Title, Tasks } = req.body;
      const newTask = {
        Title,
        Tasks,
      };
  
      const result = await taskModel.insertOne(newTask);
  
      if (result.insertedId) {
        res.status(201).json({
          message: "Task created successfully",
          id: result.insertedId,
        });
      } else {
        res.status(500).json({ error: "Failed to create note" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
/* === ALL TASKS === */
async function showTasks(req, res) {
    const username = req.params.username;
    try {
      const noteData = await taskModel.getAll(username);
      console.log(noteData);
      res.json(noteData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errMsg: err.message });
    }
  }

/* === UPDATE TASK === */
async function updateTasks(req, res) {
    try {
      const noteId = req.params.id;
      const { updateTasks } = req.body;
  
      if (
        !updateTasks ||
        !Array.isArray(updateTasks) ||
        updateTasks.length === 0
      ) {
        return res
        .status(400)
        .json({ error: "Invalid or empty updatedTasks array." });
    }
    
          const result = await taskModel.updateOne(
            { _id: new ObjectId(noteId) },
            { $set: { Tasks: updatedTasks } }
          );
  
          if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Note not found." });
          }
  
          return res.json({ message: "Tasks updated successfully" });
        } catch (error) {
          console.error("Error updating tasks:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };

 /* === DELETE NOTE === */
async function deleteTask(req, res) {
    try {
      const noteId = req.params.id;
      const result = await taskModel.deleteOne({
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