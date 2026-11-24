
const Notification = require("../models/Notification");

// ========================================
// GET MY NOTIFICATIONS
// ========================================

const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const notifications = await Notification.find({
      recipient: userId,
    })
      .populate("sender", "name")
      .populate("request", "title")
      .sort({ createdAt: -1 })
      .limit(100);

    const unreadCount = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      unreadCount,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch notifications",
    });
  }
};

// ========================================
// MARK ONE NOTIFICATION AS READ
// ========================================

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: req.user.userId,
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark as read error:", error.message);

    return res.status(500).json({
      message: "Unable to update notification",
    });
  }
};

// ========================================
// MARK ALL AS READ
// ========================================

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        recipient: req.user.userId,
        isRead: false,
      },
      { isRead: true }
    );

    return res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark all as read error:", error.message);

    return res.status(500).json({
      message: "Unable to update notifications",
    });
  }
};

// ========================================
// DELETE NOTIFICATION
// ========================================

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user.userId,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error.message);

    return res.status(500).json({
      message: "Unable to delete notification",
    });
  }
};

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
