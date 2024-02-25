const { User: userDao } = require("../daos/user_daos");
const noteDao = require("../daos/note_daos");


async function getAll(username) {
  try {
    // Assuming the User model has a reference to notes (e.g., an array of note IDs)
    const user = await userDao.findOne({ username: username }).populate('notes');
    if (!user) {
      throw new Error('User not found');
    }
    
    // If the user document includes the notes directly after population
    const notesForCalendar = user.notes; // Assuming 'notes' is populated with note documents
    
    // Format or process notes for the calendar as needed here
    // This step depends on how you intend to use the notes in the calendar

    return notesForCalendar;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error; // Rethrow or handle error as appropriate for your application's error handling strategy
  }
}

module.exports = { getAll };



