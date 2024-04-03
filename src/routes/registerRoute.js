const express = require("express");
const router = express.Router();

// import authenticationUser function for user login authentication
const { authenticateNewUser } = require("../middleware/authenticateNewUser");

//use the imported authenticateNewUser middleware to authenticate new users
router.post("/register", authenticateNewUser, (req, res) => {
  res.status(201).json({ token: req.token });
});

module.exports = router;
