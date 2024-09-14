const Lecture = require("../models/Lecture");
const Session = require("../models/Session");
const { io } = require("../index"); // Import the io instance

// Upload a video lecture
exports.uploadLecture = async (req, res) => {
  if (req.user.role !== "teacher") {
    return res
      .status(403)
      .json({ message: "Only teachers can upload lectures" });
  }

  const { title, videoUrl } = req.body;
  try {
    const session = await Session.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const lecture = new Lecture({
      title,
      session: req.params.sessionId,
      videoUrl,
    });

    await lecture.save();
    await Session.findByIdAndUpdate(req.params.sessionId, {
      $push: { lectures: lecture._id },
    });

    // Emit an event to notify clients about the new lecture
    io.emit("lectureUploaded", lecture);

    res.status(201).json({ message: "Lecture uploaded successfully", lecture });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
