const express = require("express");
const router = express.Router();
const { addComment } = require("../controllers/commentController");
const auth = require("../middleware/auth");

// Add a comment to a lecture
router.post("/:lectureId", auth, addComment);

module.exports = router;
