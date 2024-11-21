// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");

// Load environment variables from .env file
dotenv.config();
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL from env file
    credentials: true, // If you're using cookies/auth headers
  })
);

app.use(express.json()); // For parsing application/json

// Serve static files from the `uploads` directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.options("/api/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(204);
});

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
