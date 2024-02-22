const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required and must be a string."],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Content is required and must be a string."],
        trim: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required."],
    },
    tasks: [
        {
            content: {
                type: String,
                required: [true, "Task content is required and must be a string."],
                trim: true,
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;