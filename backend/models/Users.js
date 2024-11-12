// models/Item.js
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  paswword: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
