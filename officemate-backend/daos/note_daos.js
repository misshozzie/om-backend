const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = require("./task_daos").schema;

// const noteSchema = new Schema({
//   Title: { type: String, required: true },
//   Date: { type: Date, required: true },
//   Description: { type: String, required: true },
//   Calendar: { type: Boolean, default: true },
//   Tasks: [TaskSchema], 
// }, { timestamps: true });

const noteSchema = new mongoose.Schema({
  Title: String,
  Date: Date,
  Description: String,
  Calendar: String, 
  Tasks: [TaskSchema],
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

