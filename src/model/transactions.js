const mongoose = require("mongoose");
const User = require("../model/user");

const transactionSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  crypto: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transactions = mongoose.model("Transaction", transactionSchema);
module.exports = Transactions;
