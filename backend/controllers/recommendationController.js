const { OpenAI } = require("openai");
const Job = require("../models/Job");
const User = require("../models/User");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // 👈 Use OpenRouter's base URL
});

exports.getJobRecommendations = async (req, res) => {
  try {
    console.log("🔍 Finding user...");
    const user = await User.findById(req.userId);

    console.log("👤 User found:", user);

    console.log("📄 Fetching jobs...");
    const jobs = await Job.find();
    console.log("📄 Jobs found:", jobs.length);

    const jobList = jobs.map(
      (job, index) =>
        `${index + 1}. ${job.title} at ${job.company}, Location: ${job.location}, Skills: ${job.skills.join(", ")}`
    );

    const prompt = `
You are an AI job recommendation assistant.
The user has the following profile:
- Name: ${user.name}
- Location: ${user.location}
- Experience: ${user.experience} years
- Skills: ${user.skills.join(", ")}
- Preferred Job Type: ${user.preferredJobType}

Here is a list of available job listings:
${jobList.join("\n")}

Based on the user's profile, recommend the top 3 job matches. Return them as a numbered list with title, company, and reason for the match.
`;

    console.log("🤖 Sending prompt to OpenAI...");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    console.log("✅ Response received from OpenAI");

    const aiReply = response.choices[0].message.content;
    res.json({ matches: aiReply });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Failed to get AI recommendations" });
  }
};
