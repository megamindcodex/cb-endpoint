// const mongoose = require("mongoose");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .send({ error: "Access Denied. No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await User.findById(decoded.id).populate("wallet");
    if (!user)
      return res.status(401).send({ error: "Access Denied. Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { authorize };
