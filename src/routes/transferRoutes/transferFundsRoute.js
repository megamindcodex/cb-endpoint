const express = require("express");
const router = express.Router();
const { authorize } = require("../../middleware/auth");
const User = require("../../model/user");
const Wallet = require("../../model/wallet");
const { transferFunds } = require("../../controllers/transferFunds");

router.post("/tranfer-funds", authorize, async (req, res) => {
  try {
    // console.log(req.user);
    const userId = req.user._id;
    const walletAddress = "0088456282";
    const amount = 10;
    const crypto = "USDT";

    // get the sender
    const sender = await User.findById(userId).populate("wallet");
    // console.log(sender);
    const error = [];
    const receiver = await fetchReceiver(walletAddress, sender, error);
    if (!receiver) {
      return res.status(404).send({ error: "Receiver not found" });
    }

    if (error.length > 0) {
      res.send(error);
    }
    const transaction = await transferFunds(sender, receiver, amount, crypto);
    console.log(amount);
    if (!transaction) {
      res.status(200).json({ message: "insufficient funds" });
    } else {
      res.status(200).json(transaction);
    }
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
    console.error("Error, Failed to Transfer funds", err, err.message);
  }
});

const fetchReceiver = async (walletAddress, sender, error) => {
  try {
    // Find a user with the specified wallet address
    const wallet = await Wallet.findOne({ walletAddress: walletAddress });
    const receiver = await User.findById(wallet.user).populate("wallet");
    if (walletAddress === sender.wallet.walletAddress) {
      console.log(
        `${walletAddress} is your wallet address, You can only transfer funds to other wallet addresses`
      );

      error.push({
        error: `${walletAddress} is your wallet address, You can only transfer funds to other wallet addresses`,
      });
      return `${walletAddress} is your wallet address, You can only transfer funds to other wallet addresses`;
    }
    // console.log(receiver);

    if (!receiver) {
      console.log("Receiver not found");
      return null; // Return null if no user is found with the specified wallet address
    }

    return receiver;
  } catch (err) {
    console.log("Failed to fetch receiver", err, err.message);
    return null;
  }
};

module.exports = router;
