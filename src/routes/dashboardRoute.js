const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const Wallet = require("../model/wallet");

router.get("/dashboard", authorize, (req, res) => {
  const user = req.user;

  res.status(200).json(user);
  console.log("dashboard Route received");
});

module.exports = router;
