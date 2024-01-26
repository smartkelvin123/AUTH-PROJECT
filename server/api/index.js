const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api", authRoutes);

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
