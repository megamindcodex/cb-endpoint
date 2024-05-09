const express = require("express");
const router = express.Router();

// import authenticateNewUser function for user registration authentication
const { authenticateNewUser } = require("../middleware/authenticateNewUser");

//use the imported authenticateNewUser middleware to authenticate new users
router.post("/register", authenticateNewUser, (req, res) => {
  res.status(201).json({ token: req.token });
});

module.exports = router;
