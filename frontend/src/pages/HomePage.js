// frontend/src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Virtual Classroom</h1>
      <p>Empowering education through technology.</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
