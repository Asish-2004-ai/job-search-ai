import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <Link to={'/login'}>  
          <Typography variant="h4" gutterBottom>Login</Typography>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} />
        <Button fullWidth variant="contained" color="primary" type="submit">Sign Up</Button>
      </form>
    </Container>
  );
};

export default Signup;
