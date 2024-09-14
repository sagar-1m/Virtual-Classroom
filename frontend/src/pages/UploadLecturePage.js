import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function UploadLecturePage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { classId } = useParams(); // Get classId from route parameters

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `/classes/upload/${classId}`, // Use classId from useParams
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      navigate(`/class/${classId}`); // Redirect after upload
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error occurred while uploading the lecture"
      );
    }
  };

  return (
    <div>
      <h2>Upload Lecture</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Upload Lecture</button>
      </form>
    </div>
  );
}

export default UploadLecturePage;
