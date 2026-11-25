
const Notification = require("../models/Notification");
const { getIO } = require("../socket");

const createNotification = async ({
  recipient,
  sender = null,
  request = null,
  type,
  title,
  message,
  link = "",
}) => {
  try {
    const notification = await Notification.create({
      recipient,
      sender,
      request,
      type,
      title,
      message,
      link,
    });

    const populatedNotification = await Notification.findById(
      notification._id
    )
      .populate("sender", "name")
      .populate("request", "title");

    const io = getIO();

    // Send notification to the recipient's personal room
    io.to(`user-${recipient.toString()}`).emit(
      "new-notification",
      populatedNotification
    );

    return populatedNotification;
  } catch (error) {
    console.error("Create notification error:", error.message);
    throw error;
  }
};

module.exports = createNotification;
