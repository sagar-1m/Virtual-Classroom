const Comment = require("../models/Comment");
const Lecture = require("../models/Lecture");
const { io } = require("../index"); // Import the io instance

// Add a comment to a lecture
exports.addComment = async (req, res) => {
  const { content, parent } = req.body;
  try {
    const comment = new Comment({
      content,
      lecture: req.params.lectureId,
      user: req.user.id,
      parent,
    });

    await comment.save();
    await Lecture.findByIdAndUpdate(req.params.lectureId, {
      $push: { comments: comment._id },
    });

    // Emit an event to notify clients about the new comment
    io.emit("commentAdded", comment);

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
