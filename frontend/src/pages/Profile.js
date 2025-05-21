import React, { useState, useEffect } from "react";
import {
  Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput,
} from "@mui/material";
import API from "../api/axios";
import { skillsList } from "../data/skill";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    experience: "",
    skills: [],
    jobType: "",
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.log("No profile yet.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setProfile({ ...profile, skills: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("/profile", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Profile saved!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error saving profile.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" value={profile.name} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Location" name="location" value={profile.location} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Years of Experience" name="experience" value={profile.experience} onChange={handleChange} />

        <FormControl fullWidth margin="normal">
          <InputLabel>Skills</InputLabel>
          <Select
            multiple
            value={profile.skills}
            onChange={handleSkillsChange}
            input={<OutlinedInput label="Skills" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {skillsList.map((skill) => (
              <MenuItem key={skill} value={skill}>
                <Checkbox checked={profile.skills.indexOf(skill) > -1} />
                <ListItemText primary={skill} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Preferred Job Type</InputLabel>
          <Select name="jobType" value={profile.jobType} onChange={handleChange}>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="onsite">Onsite</MenuItem>
            <MenuItem value="any">Any</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">Save Profile</Button>
      </form>
    </Container>
  );
};

export default Profile;
