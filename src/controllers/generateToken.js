// import json web token
const jwt = require("jsonwebtoken");

// genetate token

const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRETE;

  //   user Id passed as a parameter from the signupUser file
  // is been used as a payload in the generation of the json web token
  console.log(jwtSecret);
  const token = jwt.sign({ id: userId }, jwtSecret);

  return token;
};

module.exports = { generateToken };
