const User = require("../model/user"); // Assuming you have a User model
const Wallet = require("../model/wallet");
const Transaction = require("../model/transactions");

const createTransaction = async (senderId, receiverId, crypto, amount) => {
  try {
    // const senderWallet = sender.wallet;
    // const receiverWallet = receiver.wallet;
    const sender = await User.findById(senderId).populate("wallet");
    const receiver = await User.findById(receiverId).populate("wallet");

    // const senderWallet = sender.wallet;
    // const receiverWallet = sender.wallet;
    if (!sender) {
      console.log("sender not found");
    }

    if (!receiver) {
      console.log("receiver not found");
    }

    const newTransaction = {
      from: sender.userName,
      to: receiver.userName,
      crypto: crypto,
      amount: amount,
      status: "successful",
    };
    // console.log(transactionObject);
    const transaction = await Transaction.create(newTransaction);

    await updateWallet(senderId, transaction._id, "debit");
    await updateWallet(receiverId, transaction._id, "credit");

    // await sender.save();
    // await receiver.save();

    return transaction;
  } catch (err) {
    console.error("Error creating transaction", err, err.message);
  }
};

updateWallet = async (userId, transaction, tranType) => {
  try {
    // Find the wallet by user ID
    console.log(userId);
    const wallet = await Wallet.findOne({ user: userId });
    // console.log(wallet);

    // Check if wallet exists
    if (!wallet) {
      throw new Error("Wallet not found");
    }

    // Add the transaction ID to the transactionIds array
    wallet.transactionIds.push({ tranType: tranType, tranId: transaction._id });

    // Save the updated wallet document
    await wallet.save();

    return true;
  } catch (err) {
    console.error("Error updating wallet", err);
    return { success: false, error: err.message };
  }
};

module.exports = { createTransaction };
