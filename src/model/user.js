const mongoose = require("mongoose");
const Wallet = require("../model/wallet");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    // required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
