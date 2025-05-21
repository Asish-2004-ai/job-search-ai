const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../models/Job");

dotenv.config();

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangalore",
    skills: ["React", "JavaScript", "Tailwind"],
    jobType: "remote",
  },
  {
    title: "Backend Engineer",
    company: "DataWiz",
    location: "Hyderabad",
    skills: ["Node", "Express", "MongoDB"],
    jobType: "onsite",
  },
  {
    title: "Full Stack Developer",
    company: "DevSolutions",
    location: "Remote",
    skills: ["React", "Node", "MongoDB", "Tailwind"],
    jobType: "remote",
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Job.deleteMany();
    await Job.insertMany(jobs);
    console.log("🌱 Jobs Seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedJobs();
