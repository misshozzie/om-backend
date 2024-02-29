const Task = require("../daos/task_daos");
const Note = require("../daos/note_daos");

module.exports = {
  createOne,
  findNoteById,
  findTaskById,
  deleteOne,
  updateOne,
  getAllOfNote
};

/*=== GET ALL ===*/
async function getAllOfNote(noteId) {
  try {
    const taskData = await Note.findById(noteId);

    if (!taskData) {
      // Handle the case where the user is not found
      console.log('Note not found');
      return []; // Return an empty array or consider throwing an error
    }
    // console.log("data",t.Notes);

    const newTasks = []
    for (let index = 0; index < taskData.Tasks.length; index++) {
      const task = taskData.Tasks[index];
      // console.log(note._id);
      const taskD = await Task.findById(task._id);
      if (taskD != null)
      {
        newTasks.push(taskD);
      }
    }

    // Assuming 'notes' is a correctly defined reference in the user schema
    // const noteDataPopulated = await noteData.populate('Notes');
    // console.log(noteDataPopulated);
    // Return the populated notes, ensuring an array is always returned
    return newTasks || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error; // Rethrow or handle as appropriate for your error handling strategy
  }
}


/*=== CREATE ONE ===*/
async function createOne(tasks,noteId) {
  try {
    console.log(tasks);
    const newTask = await Task.create({
      title: tasks.Title,
      task: tasks.Task,
    });

    const note = await Note.findById(noteId);
    if (!note) {
      throw new Error("Note not found");
    }

    note.Tasks.push(newTask);
    await note.save();

    return { message: 'Task added successfully', task: newTask };
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
      const taskIndex = note.Tasks.findIndex(
        (task) => task._id.toString() === taskID.toString()
      );
      if (taskIndex !== -1) {
        note.Tasks[taskIndex].title = data.title;
        note.Tasks[taskIndex].task = data.task;
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
    const note = await Note.findOne({ "Tasks._id": taskID });
    console.log("data",deletedTask,note);
    if (note) {
      console.log("data",deletedTask);
      // Remove the deleted task from the tasks array
      note.Tasks.pull(deletedTask);

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

