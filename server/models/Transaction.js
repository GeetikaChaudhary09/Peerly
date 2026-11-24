const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    points: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      enum: [
        "task-reward",
        "refund",
        "adjustment",
      ],
      default: "task-reward",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.model(
    "Transaction",
    transactionSchema
  );

module.exports = Transaction;