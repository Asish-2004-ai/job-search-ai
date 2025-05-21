import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import API from "../api/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Job Listings
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {job.company} | {job.location}
                  </Typography>
                  <div style={{ marginTop: "0.5rem" }}>
                    {job.skills.map((skill, index) => (
                      <Chip key={index} label={skill} sx={{ m: 0.5 }} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Jobs;
