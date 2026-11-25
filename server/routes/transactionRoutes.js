const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMyTransactions,
} = require("../controllers/transactionController");

// Get logged-in user's transaction history
router.get("/", authMiddleware, getMyTransactions);

module.exports = router;