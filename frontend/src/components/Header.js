// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Class Management System</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/join-class">Join Class</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}

export default Header;
