import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} />
        <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
