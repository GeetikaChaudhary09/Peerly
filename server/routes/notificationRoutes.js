
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// Get all notifications
router.get("/", authMiddleware, getMyNotifications);

// Mark all notifications as read
router.patch("/read-all", authMiddleware, markAllAsRead);

// Mark one notification as read
router.patch("/:id/read", authMiddleware, markAsRead);

// Delete one notification
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;
