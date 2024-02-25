const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start: Date,
  end: Date,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


