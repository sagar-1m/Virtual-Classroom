// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Class Management System</h1>
      <p>
        <Link to="/join-class">Join a Class</Link>
      </p>
      <p>
        <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
}

export default HomePage;
