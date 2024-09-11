const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  technologies: {
    type: [String],  // Array of strings for technologies used (e.g., React, Node.js)
    required: true
  },
  image: {
    type: String,    // URL for the project image
    required: true
  },
  liveLink: {
    type: String,    // URL for the live project
    required: true
  },
  repoLink: {
    type: String,    // URL for the GitHub repository
    required: true
  },
  date: {
    type: Date,      // Date the project was completed or published
    default: Date.now
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
