const Class = require("../models/Class");
const Unit = require("../models/Unit");
const Session = require("../models/Session");
const Lecture = require("../models/Lecture");
const { io } = require("../index"); // Import the io instance

// Create a new class
exports.createClass = async (req, res) => {
  if (req.user.role !== "teacher") {
    return res
      .status(403)
      .json({ message: "Only teachers can create classes" });
  }

  const { title, description } = req.body;
  try {
    const newClass = new Class({
      title,
      description,
      teacher: req.user.id,
    });

    await newClass.save();

    // Emit an event to notify clients about the new class
    io.emit("classCreated", newClass);

    res.status(201).json({ message: "Class created successfully", newClass });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Join a class
exports.joinClass = async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can join classes" });
  }

  try {
    const classToJoin = await Class.findById(req.params.classId);

    if (!classToJoin) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classToJoin.students.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have already joined this class" });
    }

    classToJoin.students.push(req.user.id);
    await classToJoin.save();

    // Emit an event to notify clients about the student joining
    io.emit("studentJoined", {
      classId: req.params.classId,
      studentId: req.user.id,
    });

    res.json({
      message: "You have successfully joined the class",
      class: classToJoin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
