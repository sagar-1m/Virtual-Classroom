// frontend/src/pages/DashBoardPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const DashBoardPage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if token is not present
    } else {
      // Fetch user data or class data
      axios
        .get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUserData(response.data); // Set user data
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/login"); // Redirect to login if token is invalid
        });
    }
  }, [navigate]);

  if (!userData) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <div>
      <h2>Welcome, {userData.name}</h2>
      <p>Role: {userData.role}</p>
      {/* You can add more dashboard features here */}
    </div>
  );
};

export default DashBoardPage;
