const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  skills: [{ type: String }],
  jobType: { type: String, enum: ["remote", "onsite", "any"], default: "any" },
});

module.exports = mongoose.model("Job", jobSchema);
