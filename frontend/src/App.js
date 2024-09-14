// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashboardPage";
import UploadLecturePage from "./pages/UploadLecturePage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/upload-lecture/:classId" component={UploadLecturePage} />
        <Route path="/chat" component={ChatPage} />
      </Routes>
    </Router>
  );
};

export default App;
