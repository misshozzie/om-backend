const taskModel = require("../models/tasks");

module.exports = {
  newTask,
  updateTask,
  deleteTask,
  getOneTask,
  getAllTasksOfNote
  // updateTasks,
};

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
      const { Title, Task, NoteId } = req.body;
      
      const newTask = {
        Title,
        Task
      };
  
      const result = await taskModel.createOne(newTask,NoteId);
  
      if (result.task) {
        res.status(201).json({
          message: "Task created successfully",
          data: result.task
          // id: result.insertedId,
        });
      } else {
        res.status(500).json({ error: "Failed to create Task" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
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
};

/* === GET ONE NOTE === */
async function getOneTask(req, res) {
  const {id} = req.params;
  try {
    const taskData = await taskModel.findTaskById(id);
    res.json(taskData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === UPDATE ONE NOTE === */
async function updateTask(req, res) {
  const taskId = req.params.id;
  const body = req.body;
  try {
    const taskData = await taskModel.updateOne(taskId, body);
    res.json(taskData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}