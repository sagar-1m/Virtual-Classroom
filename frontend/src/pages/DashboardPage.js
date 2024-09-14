// src/pages/DashboardPage.js
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function DashboardPage() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("/classes");
        setClasses(response.data.classes);
      } catch (err) {
        setError("Error fetching classes");
      }
    };
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>{classItem.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
