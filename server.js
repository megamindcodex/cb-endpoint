require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected.....✅ ");
  } catch (err) {
    console.error("Error connecting to MongoDB ❌:", err);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

// import Routes from the Routes folder
const registerUserRoute = require("./src/routes/registerRoute");
const loginRoute = require("./src/routes/loginRoute");
const dashboardRoute = require("./src/routes/dashboardRoute");
const transferFundsRoute = require("./src/routes/transferRoutes/transferFundsRoute");

// use Routes
app.use("/api", registerUserRoute);
app.use("/api", loginRoute);
app.use("/api", dashboardRoute);
app.use("/api", transferFundsRoute);

// Start the server after database connection is established
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT} http://localhost:${PORT}`);
  });
});
