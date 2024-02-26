const taskModel = require("../models/tasks");

module.exports = {
  newTask,
  //showTasks,
  //updateTasks,
  getOneTask,
  deleteTask,
  //updateTasks,
  getAllTasksOfNote,
};

/* === GET ALL TASKS OF NOTE === */
async function getAllTasksOfNote(req, res) {
  // const username = req.params.username;
  try {
    const taskData = await taskModel.getAllOfNote(req.params.id);
    console.log(taskData);
    res.json(taskData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === NEW TASK === */
async function newTask(req, res) {
  try {
    const { Title, Tasks, NoteId } = req.body;

    const newTask = {
      Title,
      Tasks,
    };

    const result = await taskModel.insertOne(newTask, NoteId);

    if (result.insertedId) {
      res.status(201).json({
        message: "Task created successfully",
        //id: result.insertedId,
      });
    } else {
      res.status(500).json({ error: "Failed to create note" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}

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

/* === DELETE NOTE === */
async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const result = await taskModel.deleteOne(taskId);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
}

/* === GET ONE TASK === */
async function getOneTask(req, res) {
  const { id } = req.params;
  try {
    const taskData = await taskModel.findTaskById(id);
    res.json(taskData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}
