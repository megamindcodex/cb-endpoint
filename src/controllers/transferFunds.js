const { createTransaction } = require("../controllers/createTransaction");
const Wallet = require("../model/wallet");

const transferFunds = async (sender, receiver, amount, crypto) => {
  try {
    // Re-fetch the sender and receiver wallets to ensure we're working with the most up-to-date version
    const senderWallet = await Wallet.findById(sender.wallet._id);
    const receiverWallet = await Wallet.findById(receiver.wallet._id);

    if (!senderWallet || !receiverWallet) {
      console.error("Wallet object is undefined");
      return "Wallet object is undefined";
    }

    // check if sender has any available cryptocurrencies
    if (senderWallet.cryptocurrencies.length < 1) {
      console.log("Wallet is empty");
      return "Wallet is empty";
    }

    // find the cryptocurrency to be sent, in the senders wallet
    const senderCrypto = senderWallet.cryptocurrencies.find(
      (cryptoFunds) => cryptoFunds.name === crypto
    );

    if (!senderCrypto || senderCrypto.amount < amount) {
      console.log("Insufficient funds");
      return "Insufficient funds";
    }

    senderCrypto.amount = Number(senderCrypto.amount) - Number(amount);

    if (receiverWallet.cryptocurrencies.length > 0) {
      // find the cryptocurrency to be received from the sender, in the receiver wallet
      const receiverCrypto = receiverWallet.cryptocurrencies.find(
        (cryptoFunds) => cryptoFunds.name === crypto
      );

      if (receiverCrypto) {
        receiverCrypto.amount = Number(receiverCrypto.amount) + Number(amount);
      } else {
        // If receiverCrypto is undefined, add a new cryptocurrency object
        receiverWallet.cryptocurrencies.push({
          name: crypto,
          amount: amount,
        });
      }
    } else {
      receiverWallet.cryptocurrencies.push({
        name: crypto,
        amount: amount,
      });
    }
    await senderWallet.save();
    await receiverWallet.save();

    const transaction = await createTransaction(
      sender._id,
      receiver._id,
      crypto,
      amount
    );

    console.log("Transaction successful");

    // Save the updated sender and receiver objects back to the database

    return transaction;
  } catch (err) {
    console.log("Error: failed to transfer funds", err, err.message);
    return null;
  }
};

module.exports = { transferFunds };
