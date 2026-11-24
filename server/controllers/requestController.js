const Request = require("../models/Request");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const createNotification = require("../utils/notificationService");



// Safely create notifications without breaking main actions
const sendNotification = async (data) => {
  try {
    await createNotification(data);
  } catch (error) {
    console.error("Notification delivery failed:", error.message);
  }
};

// Create a new request
const createRequest = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      duration,
      points,
      attachments,
    } = req.body;

    if (!title || !description || !category || !duration || !points) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const request = await Request.create({
      title,
      description,
      category,
      duration,
      points,
      attachments: attachments || [],
      requester: req.user.userId,
    });
    // Notify other students about the new request
const otherUsers = await User.find({
  _id: { $ne: req.user.userId },
}).select("_id");

await Promise.all(
  otherUsers.map((user) =>
    sendNotification({
      recipient: user._id,
      sender: req.user.userId,
      request: request._id,
      type: "new-request",
      title: "New request available!",
      message: `${title} has been posted by a student.`,
      link: `/request/${request._id}`,
    })
  )
);

    res.status(201).json({
      message: "Request created successfully",
      request,
    });
  } catch (error) {
    console.error("Create request error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all open requests (excluding user's own requests)
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: "open",
      requester: { $ne: req.user.userId },
    })
      .populate("requester", "name email college rating")
      .sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get requests error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get logged-in user's own requests
const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      requester: req.user.userId,
    })
      .populate("requester", "name email college rating")
      .sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get my requests error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get single request
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate(
      "requester",
      "name email college rating"
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    res.status(200).json({
      request,
    });
  } catch (error) {
    console.error("Get request error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Accept request
const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "open") {
      return res.status(400).json({
        message: "This request is no longer available",
      });
    }

    if (request.requester.toString() === req.user.userId) {
      return res.status(400).json({
        message: "You cannot accept your own request",
      });
    }

    request.helper = req.user.userId;
    request.status = "accepted";
    request.acceptedAt = new Date();

    await request.save();
    // Notify requester that their request was accepted
await sendNotification({
  recipient: request.requester,
  sender: req.user.userId,
  request: request._id,
  type: "request-accepted",
  title: "Your request was accepted!",
  message: "A student has accepted your request and is ready to help.",
  link: `/workspace/${request._id}`,
});

    res.status(200).json({
      message: "Request accepted successfully",
      request,
    });
  } catch (error) {
    console.error("Accept request error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Start an accepted task
const startTask = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Only the assigned helper can start the task
    if (!request.helper || request.helper.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Only the assigned helper can start this task",
      });
    }

    // Task must be accepted before starting
    if (request.status !== "accepted") {
      return res.status(400).json({
        message: "Only an accepted task can be started",
      });
    }

    request.status = "in-progress";

    await request.save();
    // Notify requester that the task has started
await sendNotification({
  recipient: request.requester,
  sender: req.user.userId,
  request: request._id,
  type: "task-started",
  title: "Your task has started!",
  message: "Your peer has started working on your request.",
  link: `/workspace/${request._id}`,
});

    res.status(200).json({
      message: "Task started successfully",
      request,
    });
  } catch (error) {
    console.error("Start task error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get requests accepted by the logged-in user
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Request.find({
      helper: req.user.userId,
    })
      .populate("requester", "name email college rating")
      .populate("helper", "name email college rating")
      .sort({ acceptedAt: -1 });

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error("Get my tasks error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get private workspace for a request
const getRequestWorkspace = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("requester", "name email college")
      .populate("helper", "name email college");

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const userId = req.user.userId;

    const isRequester =
      request.requester?._id.toString() === userId;

    const isHelper =
      request.helper?._id.toString() === userId;

    if (!isRequester && !isHelper) {
      return res.status(403).json({
        message: "You are not authorized to access this workspace",
      });
    }

    if (!request.helper) {
      return res.status(400).json({
        message: "This request has not been accepted yet",
      });
    }

    res.status(200).json({
      message: "Workspace accessed successfully",
      workspace: {
  requestId: request._id,
  title: request.title,
  description: request.description,
  category: request.category,
  status: request.status,
  duration: request.duration,
  points: request.points,
  requester: request.requester,
  helper: request.helper,
  attachments: request.attachments,
  createdAt: request.createdAt,
  acceptedAt: request.acceptedAt,
  completedAt: request.completedAt,
},
    });
  } catch (error) {
    res.status(500).json({
      message: "Error accessing workspace",
      error: error.message,
    });
  }
};

// ==========================================
// REQUEST COMPLETION
// ==========================================

const requestCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const userId = req.user.userId.toString();

    // Only assigned helper can request completion
    if (
      !request.helper ||
      request.helper.toString() !== userId
    ) {
      return res.status(403).json({
        message:
          "Only the assigned helper can request completion",
      });
    }

    // Task must be in progress
    if (request.status !== "in-progress") {
      return res.status(400).json({
        message:
          "Task must be in progress before requesting completion",
      });
    }

    request.status = "completion-requested";

    await request.save();
    // Notify requester about completion request
await sendNotification({
  recipient: request.requester,
  sender: req.user.userId,
  request: request._id,
  type: "completion-requested",
  title: "Task completion requested!",
  message: "Your peer has requested you to confirm task completion.",
  link: `/workspace/${request._id}`,
});

    return res.status(200).json({
      message: "Completion requested successfully",
      request,
    });
  } catch (error) {
    console.error(
      "Request completion error:",
      error.message
    );

    return res.status(500).json({
      message: "Unable to request completion",
    });
  }
};


// ==========================================
// CONFIRM COMPLETION + PEERPOINT TRANSFER
// ==========================================

const confirmCompletion = async (req, res) => {
  const session = await require("mongoose").startSession();

  try {
    const { id } = req.params;
    const userId = req.user.userId.toString();

    let completedRequest;

    await session.withTransaction(async () => {

      const request = await Request.findById(id).session(session);

      if (!request) {
        const error = new Error("Request not found");
        error.statusCode = 404;
        throw error;
      }

      // Only requester can confirm
      if (request.requester.toString() !== userId) {
        const error = new Error(
          "Only the requester can confirm completion"
        );
        error.statusCode = 403;
        throw error;
      }

      // Prevent duplicate transfers
      if (request.status !== "completion-requested") {
        const error = new Error(
          "Completion has already been processed or not requested"
        );
        error.statusCode = 400;
        throw error;
      }

      const points = Number(request.points);

      if (!Number.isSafeInteger(points) || points <= 0) {
        const error = new Error("Invalid PeerPoints amount");
        error.statusCode = 400;
        throw error;
      }

      if (!request.helper) {
        const error = new Error("No helper assigned to this task");
        error.statusCode = 400;
        throw error;
      }

      // Deduct points from requester.
      // The balance can never become negative.
      const requester = await User.findOneAndUpdate(
        {
          _id: request.requester,
          peerPoints: { $gte: points },
        },
        {
          $inc: {
            peerPoints: -points,
          },
        },
        {
          new: true,
          session,
        }
      );

      if (!requester) {
        const error = new Error(
          "Insufficient PeerPoints in requester wallet"
        );
        error.statusCode = 400;
        throw error;
      }

      // Credit helper and increment completed tasks
      const helper = await User.findByIdAndUpdate(
        request.helper,
        {
          $inc: {
            peerPoints: points,
            tasksCompleted: 1,
          },
        },
        {
          new: true,
          session,
        }
      );

      if (!helper) {
        const error = new Error("Helper account not found");
        error.statusCode = 404;
        throw error;
      }

      // Save transaction history
      await Transaction.create(
        [
          {
            request: request._id,
            fromUser: request.requester,
            toUser: request.helper,
            points,
            type: "task-reward",
            description: `Reward for completing: ${request.title}`,
          },
        ],
        { session }
      );

      // Complete task
      request.status = "completed";
      request.completedAt = new Date();

      await request.save({ session });

      completedRequest = request;
    });

    // Notify requester that the task is completed
await sendNotification({
  recipient: completedRequest.requester,
  sender: completedRequest.helper,
  request: completedRequest._id,
  type: "task-completed",
  title: "Task completed successfully!",
  message: "Your request has been completed successfully.",
  link: `/workspace/${completedRequest._id}`,
});

// Notify helper about earned PeerPoints
await sendNotification({
  recipient: completedRequest.helper,
  sender: completedRequest.requester,
  request: completedRequest._id,
  type: "points-earned",
  title: "You earned PeerPoints!",
  message: `You received ${completedRequest.points} PeerPoints for completing this task.`,
  link: `/workspace/${completedRequest._id}`,
});

    return res.status(200).json({
      message: "Task completed and PeerPoints transferred successfully",
      request: completedRequest,
    });

  } catch (error) {
    console.error(
      "Confirm completion error:",
      error.message
    );

    return res.status(error.statusCode || 500).json({
      message: error.message || "Unable to confirm completion",
    });

  } finally {
    await session.endSession();
  }
};
module.exports = {
  createRequest,
  getRequests,
  getMyRequests,
  getMyTasks,
  getRequestById,
  acceptRequest,
  getRequestWorkspace,
  startTask,
  requestCompletion,
  confirmCompletion,
};