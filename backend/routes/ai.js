const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Job = require("../models/Job");
const axios = require("axios");

router.get("/recommend", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const jobs = await Job.find();

        const prompt = `
You are a job match assistant. Match this user to the 3 most relevant jobs from the list below.

User Profile:
- Name: ${user.name}
- Skills: ${user.skills.join(", ")}
- Experience: ${user.experience} years
- Preferred Type: ${user.preferredJobType}
- Location: ${user.location}

Job Listings:
${jobs.map((job, i) =>
  `${i + 1}. ${job.title} at ${job.company}, Location: ${job.location}, Skills: ${job.skills.join(", ")}`
).join("\n")}

IMPORTANT: Respond ONLY with a valid JSON array of 3 objects in this exact format:
[
  { "title": "Job Title", "company": "Company Name", "location": "City", "skills": ["skill1", "skill2"], "reason": "Why this job matches the user" },
  ...
]
No explanation. Only valid JSON output.
`;

        const aiRes = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const text = aiRes.data.choices[0].message.content.trim();
        let recommendations = [];

        try {
            // ✅ Try parsing structured JSON directly
            recommendations = JSON.parse(text);
        } catch (e) {
            console.warn("⚠️ AI response not in JSON. Parsing manually...");

            // Fallback: split using double line breaks and extract title, company, and reason
            const structured = text
                .split("\n\n")
                .filter(Boolean)
                .map((match) => {
                    const [titleLine, reasonLine] = match.split("\n - Reason: ");
                    const [title, company] = titleLine.split(" at ");
                    return {
                        title: title?.replace(/^\d+\.\s*/, "")?.trim() || "",
                        company: company?.trim() || "",
                        location: "", // Not available in fallback
                        skills: [],   // Not available in fallback
                        reason: reasonLine?.trim() || ""
                    };
                });

            if (!structured.length) {
                return res.status(500).json({ message: "No valid matches found in AI response." });
            }

            recommendations = structured;
        }

        res.json({ recommendations });

    } catch (err) {
        console.error("🔥 AI recommendation error:", err.message);
        res.status(500).json({ message: "AI Recommendation failed" });
    }
});

module.exports = router;
