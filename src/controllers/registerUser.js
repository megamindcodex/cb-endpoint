const User = require("../model/user");
const Wallet = require("../model/wallet");

// import generateToken function to be used to generate a token
// when called by passing the user id as the parameter
const { generateToken } = require("../controllers/generateToken");

const registerUser = async (formData) => {
  try {
    const user = await User.create(formData);

    // Create the wallet
    const wallet = await Wallet.create({
      walletAddress: "0088456282",
      totalBalance: 0,
      cryptocurrencies: [],
      transactions: [],
      user: user._id,
    });

    await wallet.save();

    user.wallet = wallet._id;
    await user.save();
    console.log(wallet.user);

    if (user) {
      const userId = user._id; //get the user Id from the user object
      const token = generateToken(userId); //the token value generated is been returned from the generateToken function

      console.log("User created successfully", user);

      return token;
    }
  } catch (err) {
    console.error("Error createing user", err, err.message);
    throw err;
  }
};

module.exports = { registerUser };
