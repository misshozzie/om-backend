const { User: userDao } = require("../daos/user_daos");
const noteDao = require("../daos/note_daos");

module.exports = { 
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne
 };


/*=== GET ALL ===*/
async function getAll(userId) {
  try {
    const noteData = await userDao.findById(userId);

    if (!noteData) {
      // Handle the case where the user is not found
      console.log('User not found');
      return []; // Return an empty array or consider throwing an error
    }
    console.log("data",noteData.Notes);

    const newNotes = []
    for (let index = 0; index < noteData.Notes.length; index++) {
      const note = noteData.Notes[index];
      console.log(note._id);
      const noteD = await noteDao.findById(note._id);
      if (noteD != null)
      {
        newNotes.push(noteD);
      }
    }

    // Assuming 'notes' is a correctly defined reference in the user schema
    // const noteDataPopulated = await noteData.populate('Notes');
    // console.log(noteDataPopulated);
    // Return the populated notes, ensuring an array is always returned
    return newNotes || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error; // Rethrow or handle as appropriate for your error handling strategy
  }
}


/*=== CREATE ONE ===*/
async function createOne(userId, body) {
  try {
    const userData = await userDao.findById(userId);
    if (!userData) {
      throw new Error('User not found');
    }

    // Validate 'body' as needed here before creating the note
    const newNote = await noteDao.create(body);

    // Ensure that 'notes' is the correct property and it's an array
    userData.Notes.push(newNote._id); // Assuming you only need to store the note's ID
    await userData.save();

    // Decide what to return based on the needs of your application
    return { message: 'Note added successfully', note: newNote };
  } catch (error) {
    // console.error('Error creating note:', error);
    throw error; // Rethrow or handle as appropriate for your application's error handling strategy
  }
}


/*=== DELETE ONE ===*/
async function deleteOne(username, noteId) {
  try {
    // Optional: Check if the note exists and if the user is authorized to delete it
    const note = await noteDao.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }
    // If you store user information within the note, verify the user here
    // if (note.username !== username) {
    //   throw new Error('User is not authorized to delete this note');
    // }

    // Update the user document by removing the note reference
    await userDao.updateOne({ username: username }, { $pull: { notes: noteId } });

    // Proceed to delete the note
    await noteDao.findByIdAndDelete(noteId);

    // Depending on your application's needs, you might not need to fetch all notes after deletion
    // If needed, ensure there's a function getAll(username) that fetches all notes for the user
    // const noteDataUpdated = await getAll(username);
    // return noteDataUpdated;

    // Alternatively, return a success message
    return { message: 'Note deleted successfully' };
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error; // Consider how you want to handle errors. Rethrow, handle here, or convert to user-friendly error.
  }
}


/*=== GET ONE ===*/
async function getOne(noteId) {
  try {
    const noteData = await noteDao.findById(noteId);

    if (!noteData) {
      // Handle the case where no note is found with the given ID
      throw new Error('Note not found');
    }

    // Optional: Check if the requesting user (username) has permission to view the note
    // This step depends on your application's authorization logic.
    // For example, if notes are user-specific and you store a userId or username in each note:
    // if (noteData.username !== username) {
    //   throw new Error('User does not have permission to view this note');
    // }

    return noteData;
  } catch (error) {
    // Handle possible errors, such as note not found or database errors
    console.error('Error fetching note:', error);
    throw error; // Rethrow or handle as needed (e.g., return null or a specific error message)
  }
}


/*=== UPDATE ONE ===*/
async function updateOne(noteId, body) {
  try {
    // Assuming noteDao.findById actually fetches the note by ID from the database
    const noteData = await noteDao.findById(noteId);
    
    // Check if noteData exists and if the username matches the note's owner/author if applicable
    if (!noteData) {
      throw new Error('Note not found');
    }
    
    // Update the noteData object with new values from body
    noteData.Title = body.Title;
    noteData.Description = body.Description;
    noteData.Date = body.Date;
    
    // Save the updated note back to the database
    // The specific method to save the note depends on how your noteDao is implemented.
    // For a Mongoose model, it would typically be:
    await noteData.save();

    // Optionally, return the updated note or a success message
    return noteData; // or return { message: "Note updated successfully" };
  } catch (error) {
    // Handle possible errors
    console.error('Error updating note:', error);
    throw error; // Rethrow or handle as needed
  }
}
