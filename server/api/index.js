const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const CookieParser = require("cookie-parser");

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());
app.use(CookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

mongoose
  .connect(MONGO_URI)
  .then((conn) => {
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.cyan.underline.bold);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    // Terminate the server if the MongoDB connection fails
    process.exit(1);
  });
