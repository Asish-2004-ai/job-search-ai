import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route path="/recommendations" element={<Recommendations />} />

        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />
        <Route
          path="/jobs"
          element={<PrivateRoute><Jobs /></PrivateRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
