const Task = require("../daos/task_daos");
const Note = require("../daos/note_daos");

module.exports = {
  createOne,
  findNoteById,
  findTaskById,
  deleteOne,
  updateOne,
};

/*=== CREATE ONE ===*/
async function createOne(tasks) {
  try {
    const newTask = await Task.create({
      title: tasks.title,
      task: tasks.task,
      noteID: tasks.noteID,
    });

    const note = await Note.findById(tasks.noteID);
    if (!note) {
      throw new Error("Note not found");
    }

    note.tasks.push(newNote);
    await note.save();

    return newTask;
  } catch (error) {
    console.error("Error creating plan:", error);
  }
}

/*=== FIND NOTE BY ID ===*/
async function findNoteById(noteID) {
  try {
    const note = await Note.findById(noteID);

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  } catch (error) {
    throw error;
  }
}

/*=== FIND NOTE BY ID ===*/
async function findTaskById(taskID) {
  try {
    const task = await Task.findById(taskID);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw error;
  }
}

/*=== UPDATE ONE===*/
async function updateOne(taskId, data) {
  try {
    const taskID = taskId;
    const updateData = {
      title: data.title, 
      task: data.task, 
    };

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskID },
      updateData,
      { new: true }
    );
    if (!updatedTask) {
      throw new Error("Task not found");
    }

    const note = await Note.findOne({ "tasks._id": taskID });

    if (note) {
      // Update the task details within the Note's tasks array
      const taskIndex = note.tasks.findIndex(
        (task) => task._id.toString() === taskID.toString()
      );
      if (taskIndex !== -1) {
        note.tasks[taskIndex].title = data.title;
        note.tasks[taskIndex].task = data.task;
        await note.save();
      } else {
        throw new Error("Task not found in Note");
      }
    } else {
      throw new Error("Note not found for the updated task");
    }

    return updatedTask;
  } catch (error) {
    throw error;
  }
}

/*=== DELETE ONE ===*/
async function deleteOne(taskID) {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskID);
    if (!deletedTask) {
      throw new Error("Task not found in model");
    }

    // Find the corresponding Note document
    const note = await Note.findOne({ "tasks._id": taskID });

    if (note) {
      // Remove the deleted task from the tasks array
      note.tasks.pull(taskID);
      await note.save();
    } else {
      // Handle the case where the Note document is not found
      console.error("Note not found for the deleted task");
    }

    return deletedTask;
  } catch (error) {
    throw error;
  }
}

