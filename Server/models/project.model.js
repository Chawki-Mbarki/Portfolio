const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  technologies: { type: [String], required: true },
  image: { type: String, required: true },
  liveLink: { type: String, required: true },
  repoLink: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
