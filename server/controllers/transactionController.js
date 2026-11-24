const Transaction = require("../models/Transaction");

const getMyTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.find({
      $or: [
        { fromUser: userId },
        { toUser: userId },
      ],
    })
      .populate("request", "title category duration")
      .populate("fromUser", "name")
      .populate("toUser", "name")
      .sort({ createdAt: -1 })
      .limit(50);

    const history = transactions.map((transaction) => {
      const isEarned =
        transaction.toUser?._id.toString() === userId.toString();

      return {
        _id: transaction._id,
        title: transaction.request?.title || "Peerly Transaction",
        category: transaction.request?.category || "",
        points: transaction.points,
        type: isEarned ? "earned" : "spent",
        description: transaction.description,
        fromUser: transaction.fromUser?.name || "Unknown",
        toUser: transaction.toUser?.name || "Unknown",
        createdAt: transaction.createdAt,
      };
    });

    return res.status(200).json({
      message: "Transaction history fetched successfully",
      total: history.length,
      transactions: history,
    });

  } catch (error) {
    console.error("Transaction history error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch transaction history",
    });
  }
};

module.exports = {
  getMyTransactions,
};