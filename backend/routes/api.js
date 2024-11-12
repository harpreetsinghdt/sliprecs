// routes/api.js
const express = require("express");
const router = express.Router();

// Define an example GET route
router.get("/", (req, res) => {
  console.log("here ");
  res.json({ message: "Welcome to the API" });
});

// Define a simple POST route
router.post("/signup", (req, res) => {
  const { name, email, mobile, password } = req.body;

  res.json({ staus: "success", message: `Received data: ${name}, ${email}` });
});

module.exports = router;
