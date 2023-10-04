const mongoose = require("mongoose");
const subSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: [subSchema],
});

module.exports = mongoose.model("User", userSchema);
