const Message = require("../models/Message");
const Request = require("../models/Request");
const { getIO } = require("../socket");
const createNotification = require("../utils/notificationService");
const getMessages = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const userId = req.user.userId.toString();

    const isRequester =
      request.requester.toString() === userId;

    const isHelper =
      request.helper &&
      request.helper.toString() === userId;

    if (!isRequester && !isHelper) {
      return res.status(403).json({
        message:
          "You are not authorized to view these messages",
      });
    }

    if (!request.helper) {
      return res.status(400).json({
        message:
          "This request has not been accepted yet",
      });
    }

    const messages = await Message.find({
      request: requestId,
    })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error(
      "Get messages error:",
      error.message
    );

    return res.status(500).json({
      message: "Unable to load messages",
    });
  }
};


// ==========================================
// Upload File
// ==========================================

const uploadFile = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Check request
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const userId = req.user.userId.toString();

    // Check requester/helper
    const isRequester =
      request.requester.toString() === userId;

    const isHelper =
      request.helper &&
      request.helper.toString() === userId;

    if (!isRequester && !isHelper) {
      return res.status(403).json({
        message:
          "You are not authorized to upload files here",
      });
    }

    // Workspace must be accepted
    if (!request.helper) {
      return res.status(400).json({
        message:
          "This request has not been accepted yet",
      });
    }

    // Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a file",
      });
    }

    // Detect message type
    let messageType = "file";

    if (req.file.mimetype.startsWith("image/")) {
      messageType = "image";
    }

    // Create message
    const message = await Message.create({
  request: requestId,
  sender: userId,
  message: "",
  type: messageType,
  fileUrl: `/uploads/${req.file.filename}`,
  fileName: req.file.originalname,
  fileSize: req.file.size,
  mimeType: req.file.mimetype,
});

await message.populate(
  "sender",
  "name email"
);

// ==========================================
// REAL-TIME FILE MESSAGE
// ==========================================

const io = getIO();

io.to(`workspace-${requestId}`).emit(
  "new-message",
  message
);

console.log(
  `📎 File shared in workspace-${requestId} by ${userId}`
);
// Notify the other workspace participant
const recipient = isRequester
  ? request.helper
  : request.requester;

try {
  await createNotification({
    recipient,
    sender: userId,
    request: request._id,
    type: "file-uploaded",
    title: "New file shared!",
    message: `${message.sender.name} shared a file: ${message.fileName}`,
    link: `/workspace/${requestId}`,
  });
} catch (notificationError) {
  console.error(
    "File notification failed:",
    notificationError.message
  );
}
return res.status(201).json({
  message: "File uploaded successfully",
  data: message,
});
  } catch (error) {
    console.error(
      "Upload file error:",
      error.message
    );

    return res.status(500).json({
      message:
        error.message || "Unable to upload file",
    });
  }
};

module.exports = {
  getMessages,
  uploadFile,
};