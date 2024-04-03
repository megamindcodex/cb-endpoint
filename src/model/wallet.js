const mongoose = require("mongoose");
const Transactions = require("../model/transactions");

const walletSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  totalBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  cryptocurrencies: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  transactionIds: [
    {
      tranType: {
        type: String,
        required: true,
      },
      tranId: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: String,
    required: true,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
