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
async function getAll(username) {
  try {
    const noteData = await userDao.findOne({ username: username });
    if (!noteData) {
      console.log('User not found');
      return []; 
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

    //const noteDataPopulated = await noteData.populate('notes').execPopulate();
    // Return the populated notes, ensuring an array is always returned
    //return noteDataPopulated.notes || [];
    return newNOtes || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error; 
  }
}


/*=== CREATE ONE ===*/
async function createOne(username, body) {
  try {
    // const userData = await userDao.findOne({ username: username });
    const userData = await userDao.findById(userId);
    if (!userData) {
      throw new Error('User not found');
    }

    const newNote = await noteDao.create(body);

    userData.Notes.push(newNote._id); 
    await userData.save();

    return { message: 'Note added successfully', note: newNote };
  } catch (error) {
    //console.error('Error creating note:', error);
    throw error; 
  }
}

/*=== DELETE ONE ===*/
async function deleteOne(username, noteId) {
  try {

    const note = await noteDao.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }
    
    await userDao.updateOne({ username: username }, { $pull: { notes: noteId } });

  
    await noteDao.findByIdAndDelete(noteId);

    return { message: 'Note deleted successfully' };
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error; 
  }
}

/*=== GET ONE ===*/
async function getOne(noteId) {
  try {
    const noteData = await noteDao.findById(noteId);
    if (!noteData) {
      throw new Error('Note not found');
    }
    return noteData;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error; 
  }
}


/*=== UPDATE ONE ===*/
async function updateOne(noteId, body) {
  try {

    const noteData = await noteDao.findById(noteId);
    
    if (!noteData) {
      throw new Error('Note not found');
    }
    
    noteData.Title = body.Title;
    noteData.Description = body.Description;
    noteData.Date = body.date;
    
    await noteData.save();

    return noteData; 
  } catch (error) {

    console.error('Error updating note:', error);
    throw error; 
  }
}
