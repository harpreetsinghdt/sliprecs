// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
// Serve static files from the `uploads` directory
app.use("/uploads", express.static("uploads"));

// Set up routes
app.use("/api", apiRoutes);

// Database connection (MongoDB example)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on path http://localhost:${PORT}/api`);
});
