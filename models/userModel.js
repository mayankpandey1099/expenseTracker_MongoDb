
const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ispremiumuser: {
    type: Boolean,
    default: false,
  },
  total_cost: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", user);
