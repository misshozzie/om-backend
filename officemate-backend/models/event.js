const { User: userDao } = require("../daos/user_daos");
const noteDao = require("../daos/note_daos");


module.exports = { getAll, newEvent };

async function getAll(username) {
  try {
    const user = await userDao.findOne({ username: username }).populate('notes');
    if (!user) {
      throw new Error('User not found');
    }
    const notesForCalendar = user.notes; 

    return notesForCalendar;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error; 
  }
}


/*=== NEW EVENT ===*/
async function newEvent(req, res) {
  try {
    const { Title, Description, Date } = req.body;
    const newEvent = {
      Title,
      Description,
      Date,
    };

    const result = await eventModel.insertOne(newEvent);

    if (result.insertedId) {
      res.status(201).json({
        message: "Event created successfully",
        id: result.insertedId,
      });
    } else {
      res.status(500).json({ error: "Failed to create event" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}




