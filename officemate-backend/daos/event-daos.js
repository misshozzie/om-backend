const mongoose = require('mongoose');
const Note = require("./note_daos");
const Joi = require('joi');
const noteSchema = Note.schema;

const eventSchema = Joi.object({
  Note: Joi.array().items(noteSchema), 
});

module.exports = mongoose.model('Event', eventSchema);

