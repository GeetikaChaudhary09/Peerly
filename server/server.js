const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const path = require("path");
const { setIO } = require("./socket");
const User = require("./models/User");
const createNotification = require("./utils/notificationService");


require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const requestRoutes = require("./routes/requestRoutes");
const messageRoutes = require("./routes/messageRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");


const Request = require("./models/Request");
const Message = require("./models/Message");

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


// ========================================
// SOCKET.IO
// ========================================

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});
setIO(io);


// ========================================
// DATABASE
// ========================================

connectDB();


// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ========================================
// BASIC API
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "Peerly API is running 🚀",
  });
});


// ========================================
// PROTECTED PROFILE
// ========================================

// ========================================
// PROTECTED PROFILE
// ========================================

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Profile fetch error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch profile",
    });
  }
});


// ========================================
// API ROUTES
// ========================================

app.use("/api/auth", authRoutes);

app.use("/api/requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes);


// ========================================
// SOCKET.IO AUTHENTICATION
// ========================================

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(
        new Error("Authentication required")
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    socket.userId = decoded.userId;

    next();

  } catch (error) {
    console.error(
      "Socket authentication error:",
      error.message
    );

    next(
      new Error("Invalid or expired token")
    );
  }
});


// ========================================
// SOCKET.IO CONNECTION
// ========================================

io.on("connection", (socket) => {

  console.log(
    "🔌 Authenticated user connected:",
    socket.id
  );
  console.log(
    "👤 User ID:",
    socket.userId
  );

    // ======================================
  // JOIN PERSONAL NOTIFICATION ROOM
  // ======================================

  socket.join(`user-${socket.userId.toString()}`);

  console.log(
    `🔔 User ${socket.userId} joined personal notification room`
  );

  

  // ======================================
  // JOIN WORKSPACE
  // ======================================

  socket.on(
    "join-workspace",
    async (requestId, callback) => {

      try {

        const request =
          await Request.findById(requestId);

        if (!request) {

          return callback?.({
            success: false,
            message: "Request not found",
          });

        }


        const userId =
          socket.userId.toString();


        const isRequester =
          request.requester.toString() ===
          userId;


        const isHelper =
          request.helper &&
          request.helper.toString() ===
          userId;


        if (!isRequester && !isHelper) {

          return callback?.({
            success: false,
            message:
              "You are not authorized to join this workspace",
          });

        }


        if (!request.helper) {

          return callback?.({
            success: false,
            message:
              "This workspace does not have an assigned helper",
          });

        }


        socket.join(
          `workspace-${requestId}`
        );


        console.log(
          `👥 User ${userId} joined workspace-${requestId}`
        );


        callback?.({
          success: true,
          message:
            "Joined workspace successfully",
        });

      } catch (error) {

        console.error(
          "Join workspace error:",
          error.message
        );

        callback?.({
          success: false,
          message:
            "Unable to join workspace",
        });

      }

    }
  );


  // ======================================
  // SEND MESSAGE
  // ======================================

  socket.on(
    "send-message",
    async (data, callback) => {

      try {

        const {
          requestId,
          message,
        } = data || {};


        // -------------------------------
        // VALIDATE INPUT
        // -------------------------------

        if (!requestId) {

          return callback?.({
            success: false,
            message:
              "Request ID is required",
          });

        }


        if (
          !message ||
          !message.trim()
        ) {

          return callback?.({
            success: false,
            message:
              "Message cannot be empty",
          });

        }


        // -------------------------------
        // FIND REQUEST
        // -------------------------------

        const request =
          await Request.findById(requestId);


        if (!request) {

          return callback?.({
            success: false,
            message:
              "Request not found",
          });

        }


        // -------------------------------
        // CHECK USER ACCESS
        // -------------------------------

        const userId =
          socket.userId.toString();


        const isRequester =
          request.requester.toString() ===
          userId;


        const isHelper =
          request.helper &&
          request.helper.toString() ===
          userId;


        if (!isRequester && !isHelper) {

          return callback?.({
            success: false,
            message:
              "You are not authorized to send messages in this workspace",
          });

        }


        // -------------------------------
        // SAVE MESSAGE
        // -------------------------------

        const newMessage =
          await Message.create({
            request: requestId,

            sender: socket.userId,

            message: message.trim(),

            type: "text",

            fileUrl: "",

            fileName: "",
          });


        // -------------------------------
        // POPULATE SENDER
        // -------------------------------

        const populatedMessage =
          await Message.findById(
            newMessage._id
          ).populate(
            "sender",
            "name email"
          );


        // -------------------------------
        // SEND TO WORKSPACE
        // -------------------------------

        io.to(
          `workspace-${requestId}`
        ).emit(
          "new-message",
          populatedMessage
        );


        console.log(
          `💬 Message sent in workspace-${requestId} by ${userId}`
        );

        // Notify the other workspace participant
const recipient = isRequester
  ? request.helper
  : request.requester;

try {
  await createNotification({
    recipient,
    sender: socket.userId,
    request: request._id,
    type: "new-message",
    title: "New message received!",
    message: `${populatedMessage.sender.name}: ${message.trim().slice(0, 80)}`,
    link: `/workspace/${requestId}`,
  });
} catch (notificationError) {
  console.error(
    "Message notification failed:",
    notificationError.message
  );
}
        // -------------------------------
        // SUCCESS
        // -------------------------------

        callback?.({
          success: true,
          message:
            "Message sent successfully",
        });

      } catch (error) {

        console.error(
          "Send message error:",
          error.message
        );

        callback?.({
          success: false,
          message:
            "Unable to send message",
        });

      }

    }
  );


  // ======================================
  // LEAVE WORKSPACE
  // ======================================

  socket.on(
    "leave-workspace",
    (requestId) => {

      socket.leave(
        `workspace-${requestId}`
      );

      console.log(
        `👋 User ${socket.userId} left workspace-${requestId}`
      );

    }
  );


  // ======================================
  // DISCONNECT
  // ======================================

  socket.on("disconnect", () => {

    console.log(
      "❌ User disconnected:",
      socket.id
    );

  });

});


// ========================================
// START SERVER
// ========================================

server.listen(PORT, () => {

  console.log(
    `Peerly server running on http://localhost:${PORT}`
  );

  console.log(
    "🔌 Secure Socket.IO server is ready"
  );

});