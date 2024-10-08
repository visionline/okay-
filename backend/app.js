const express = require("express");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config(); 
const mongoose = require("mongoose");
const app = express();
const product = require("./src/routes/index");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
// Middleware to parse JSON request body
app.use(express.json());

// Serve static files from the public folder
app.use(express.static("public"));
app.use("/api",product)
 app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








