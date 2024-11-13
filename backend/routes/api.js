// routes/api.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

// Define an example GET route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Signup POST route
router.post("/signup", async (req, res) => {
  const { name, email, mobile, password, cpassword } = req.body;

  if (!name || !email || !mobile || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }
  if (name.length < 3) {
    return res.status(400).json({
      status: "error",
      message: "Name must be of 3 or more characters",
    });
  }
  if (mobile.length < 10) {
    return res.status(400).json({
      status: "error",
      message: "Mobile must be minimum of 10 digits",
    });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ status: "error", message: "Password must be 6 characters long" });
  }
  if (password.length !== cpassword.length) {
    return res
      .status(400)
      .json({ status: "error", message: "Passwords do not match!" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is already registered!" });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      mobile,
      password, // password will be hashed in the User model before saving
    });

    // Save the user
    await newUser.save();

    // Return success message
    res.status(200).json({
      status: "success",
      message: "User registered successfully.",
      user: {
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Login POST route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid credentials" });
    }

    // Create a JWT token (expires in 1 hour)
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload: user data
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "1h" } // Token expiration time
    );

    // Return success message and the token
    res.status(200).json({
      status: "success",
      message: "Login successful",
      token, // Send the JWT token to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
