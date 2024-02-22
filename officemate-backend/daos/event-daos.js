const mongoose = require('mongoose');

// Define the schema for a task
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  task: { type: String, required: true },
});

// Define the schema for an event
const eventSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Date: { type: Date, required: true },
  Description: { type: String, required: true },
  Calendar: { type: Boolean, default: true },
  Tasks: [taskSchema],
});

// Compile the schema into a model
const Event = mongoose.model('Event', eventSchema);

class EventDao {
  // Method to insert a single event
  async addEvent(eventData) {
    try {
      const event = new Event(eventData);
      await event.save();
      console.log('Event added successfully:', event);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  }

  // Method to insert multiple events
  async addMultipleEvents(eventsData) {
    try {
      await Event.insertMany(eventsData);
      console.log('All events added successfully');
    } catch (error) {
      console.error('Error adding multiple events:', error);
    }
  }
}

const eventDao = new EventDao();
module.exports = eventDao;
