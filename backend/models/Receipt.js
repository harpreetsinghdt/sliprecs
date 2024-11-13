// models/User.js
const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
