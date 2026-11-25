const express = require("express");

const {
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
} = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create request
router.post("/", authMiddleware, createRequest);

// Get all open requests (excluding user's own requests)
router.get("/", authMiddleware, getRequests);

// Get logged-in user's own requests
router.get("/my-requests", authMiddleware, getMyRequests);

// Get tasks accepted by logged-in user
router.get("/my-tasks", authMiddleware, getMyTasks);


// Get single request
router.get("/:id", authMiddleware, getRequestById);

// Accept request
router.patch("/:id/accept", authMiddleware, acceptRequest);
// Start accepted task
router.patch("/:id/start", authMiddleware, startTask);
// Get private workspace for a request
router.get("/:id/workspace", authMiddleware, getRequestWorkspace);
router.patch(
  "/:id/request-completion",
  authMiddleware,
  requestCompletion
);

router.patch(
  "/:id/confirm-completion",
  authMiddleware,
  confirmCompletion
);


module.exports = router;