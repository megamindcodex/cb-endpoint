// import registerUser function so it can be called whithin the authentocatNewUser function
const { registerUser } = require("../controllers/registerUser");

// get the token from thesame request object from the route handler
const authenticateNewUser = async (req, res, next) => {
  try {
    // store the request object in the variable
    const formData = req.body;
    const token = await registerUser(formData);

    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error authentocating new user", err, err.message);
  }
};

module.exports = { authenticateNewUser };
