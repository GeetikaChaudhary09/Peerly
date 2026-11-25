const express = require("express");

const {
  getMessages,
  uploadFile,
} = require("../controllers/messageController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const router = express.Router();


// ==========================================
// Get message history
// ==========================================

router.get(
  "/:requestId",
  authMiddleware,
  getMessages
);


// ==========================================
// Upload file to private workspace
// ==========================================

router.post(
  "/:requestId/upload",
  authMiddleware,
  upload.single("file"),
  uploadFile
);


module.exports = router;