const { request } = require("express");
const { loginUser } = require("../controllers/loginUser");

const authenticateUser = async (req, res, next) => {
  try {
    const formData = req.body;
    const userName = formData.userName;
    const password = formData.password;
    // console.log(userName, password);

    const token = await loginUser(userName, password);

    request.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
    console.error("Error authenticating user", err, err.message);
  }
};

module.exports = { authenticateUser };
