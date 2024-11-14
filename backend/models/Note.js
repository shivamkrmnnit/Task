const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date, // Store the due date as a Date type
  },
  priority: {
    type: String,
    required: true, // Priority can be "Low", "Medium", or "High"
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
  
});

module.exports = mongoose.model('notes', NotesSchema);
