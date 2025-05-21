// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardContent, Chip, Stack } from "@mui/material";
import API from "../api/axios";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.log("Failed to fetch profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {!profile ? (
        <Typography>You have not set up your profile yet.</Typography>
      ) : (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">{profile.name}</Typography>
            <Typography>{profile.email}</Typography>
            <Typography>Location: {profile.location}</Typography>
            <Typography>Experience: {profile.experience} years</Typography>
            <Typography>Preferred Job Type: {profile.preferredJobType}</Typography>
            <Typography mt={2}>Skills:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {profile.skills.map((skill, index) => (
                <Chip key={index} label={skill} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      <Button variant="contained" color="primary" href="/profile" sx={{ mr: 2 }}>
        {profile ? "Edit Profile" : "Create Profile"}
      </Button>
      <Button variant="contained" color="secondary" href="/recommendations">
        Find My Matches
      </Button>
      <Button style={{marginLeft:'15px'}} variant="text" color="secondary" href="/jobs">
        Jobs
      </Button>
    </Container>
  );
};

export default Dashboard;
