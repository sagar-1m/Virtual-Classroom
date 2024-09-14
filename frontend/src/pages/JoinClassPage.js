import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function JoinClassPage() {
  const [classId, setClassId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/classes/join/${classId}`);
      setMessage(response.data.message);
      navigate("/dashboard"); // Updated to use navigate
    } catch (err) {
      setError(
        err.response?.data?.message || "Error occurred while joining the class"
      );
    }
  };

  return (
    <div>
      <h2>Join a Class</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class ID</label>
          <input
            type="text"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Join Class</button>
      </form>
    </div>
  );
}

export default JoinClassPage;
