const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Class = require("../models/Class");
const multer = require("multer");
const path = require("path");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists in your project
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new class (for teachers)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "teacher") {
    return res
      .status(403)
      .json({ message: "Only teachers can create classes" });
  }

  const { title, description } = req.body;
  const newClass = new Class({
    title,
    description,
    teacher: req.user.id,
  });

  await newClass.save();
  res.status(201).json({ message: "Class created successfully" });
});

// Join a class (for students)
router.put("/join/:classId", auth, async (req, res) => {
  try {
    const classToJoin = await Class.findById(req.params.classId);

    if (!classToJoin) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Only allow students to join classes
    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can join classes" });
    }

    // Check if the student is already in the class
    if (classToJoin.students.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have already joined this class" });
    }

    classToJoin.students.push(req.user.id);
    await classToJoin.save();

    res.json({
      message: "You have successfully joined the class",
      class: classToJoin,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Upload a lecture (for teachers)
router.post(
  "/upload/:classId",
  [auth, upload.single("file")],
  async (req, res) => {
    try {
      const classToUpload = await Class.findById(req.params.classId);

      if (!classToUpload) {
        return res.status(404).json({ message: "Class not found" });
      }

      // Only allow the teacher to upload files
      if (req.user.id.toString() !== classToUpload.teacher.toString()) {
        return res
          .status(403)
          .json({ message: "Only the teacher can upload lectures" });
      }

      // Add the lecture to the class's lectures array
      const filePath = req.file.path;
      classToUpload.lectures.push(filePath);
      await classToUpload.save();

      res.json({ message: "Lecture uploaded successfully", filePath });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
