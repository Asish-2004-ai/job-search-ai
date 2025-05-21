import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import API from "../api/axios";

const Recommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Parses plain string format like: "1. Job Title at Company\n - Reason: ..."
const parseRecommendations = (matchesText) => {
  if (!matchesText || typeof matchesText !== "string") return [];

  const blocks = matchesText.split(/\n(?=\d+\.\s)/); // Split on "1. ", "2. ", etc.

  return blocks.map((block) => {
    const lines = block.trim().split("\n").map((line) => line.trim());

    const titleMatch = lines[0]?.match(/^\d+\.\s+(.*)/);
    const title = titleMatch ? titleMatch[1] : "Untitled";

    const companyLine = lines.find((line) => line.toLowerCase().startsWith("company:"));
    const company = companyLine ? companyLine.split(":")[1].trim() : "N/A";

    const reasonLine = lines.find((line) => line.toLowerCase().startsWith("reason for match:"));
    const reason = reasonLine ? reasonLine.split(":").slice(1).join(":").trim() : "N/A";
    

    return {
      title,
      company,
      location: "N/A",
      reason,
    };
  });
};


  const fetchRecommendations = async () => {
    try {
      const res = await API.get("/recommend", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("AI Response:", res.data);
      const parsed = parseRecommendations(res.data.matches);
      setJobs(parsed);
    } catch (err) {
      console.error("Failed to fetch recommendations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AI Job Matches
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : jobs.length > 0 ? (
        jobs.map((job, idx) => (
          <Card key={idx} sx={{ my: 2, p: 1 }}>
            <CardContent>
              <Typography variant="h6">{job.title}</Typography>
              <Typography>
                <strong>Company:</strong> {job.company}
              </Typography>
              {/* <Typography>
                <strong>Location:</strong> {job.location}
              </Typography> */}
              <Typography>
                <strong>Why this match:</strong> {job.reason}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No recommendations available.</Typography>
      )}
    </Container>
  );
};

export default Recommendations;
