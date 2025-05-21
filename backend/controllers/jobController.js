const Job = require("../models/Job");

// GET all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};
