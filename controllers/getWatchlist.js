const mongoose = require("mongoose");
const User = require("../models/User");

const getWatchlist = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({ success: true, watchlist: user.watchlist });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getWatchlist };
