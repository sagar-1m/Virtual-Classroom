const express = require("express");
const router = express.Router();
const { uploadLecture } = require("../controllers/lectureController");
const auth = require("../middleware/auth");

// Upload a video lecture
router.post("/:sessionId", auth, uploadLecture);

module.exports = router;
