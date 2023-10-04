const mongoose = require("mongoose");
const User = require("../models/User");

const addToWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const findIndexx = user.watchlist.findIndex((item) => item.name === name);
    if (findIndexx === -1) {
      user.watchlist.push({ name, price });

      await user.save();

      return res.status(200).json({ message: "Item added to watchlist" });
    } else {
      return res.status(400).json({ message: "Item already in the watchlist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToWatchlist };
