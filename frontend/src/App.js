// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashboardPage";
import UploadLecturePage from "./pages/UploadLecturePage";
import ChatPage from "./pages/ChatPage";
import JoinClassPage from "./pages/JoinClassPage"; // Ensure you have this page
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/header" element={<Header />} />
        <Route
          path="/upload-lecture/:classId"
          element={<UploadLecturePage />}
        />
        <Route path="/join-class" element={<JoinClassPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Router>
  );
};

export default App;
