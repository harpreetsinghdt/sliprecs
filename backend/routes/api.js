// routes/api.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");

const path = require("path");
const User = require("../models/User");
const Receipt = require("../models/Receipt");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/receipts"); // Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  },
});

const upload = multer({ storage: storage });

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

// Add Receipt POST route
router.post("/receipt/add", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  // const imagePath = `/uploads/receipts/${req.file.filename}`;
  const imagePath = `${req.file.filename}`;

  console.log(req.headers["content-type"]);
  console.log(req.body);
  const { title, amount, date, location, description, image } = req.body;
  console.log(title);

  if (!title || !amount || !date || !location) {
    return res
      .status(400)
      .json({ status: "error", message: "Fill required fields!" });
  }
  if (title.length < 3) {
    return res.status(400).json({
      status: "error",
      message: "Title must be of 3 or more characters",
    });
  }
  if (amount < 0) {
    return res.status(400).json({
      status: "error",
      message: "Amount must be greater than zero",
    });
  }
  if (location.length < 3) {
    return res.status(400).json({
      status: "error",
      message: "Location must be of 3 or more characters",
    });
  }

  try {
    // Check if the user already exists
    const isExists = await Receipt.findOne({ title });
    if (isExists) {
      return res
        .status(400)
        .json({ status: "error", message: "Title is already entered!" });
    }

    // Create new entry
    const addNew = new Receipt({
      title,
      amount,
      location,
      date,
      description,
      image: imagePath,
    });

    // Save the new entry
    await addNew.save();

    // Return success message
    res.status(200).json({
      status: "success",
      message: "Receipt added successfully.",
      receipt: {
        title: addNew.title,
        amount: addNew.amount,
        location: addNew.location,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Receipts GET route
router.get("/receipts", async (req, res) => {
  try {
    const data = await Receipt.find();
    return res
      .status(200)
      .json({ status: "success", message: "All data fetched.", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Receipts Delete route
router.delete("/receipts", async (req, res) => {
  try {
    const data = await Receipt.find();
    return res
      .status(200)
      .json({ status: "success", message: "All data fetched.", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
