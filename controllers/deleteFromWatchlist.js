const mongoose = require("mongoose");
const User = require("../models/User");

const deleteFromWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const itemIndex = user.watchlist.findIndex((item) => item.name === name);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in watchlist" });
    }

    user.watchlist.splice(itemIndex, 1);
    await user.save();

    return res.status(200).json({ message: "Item removed from watchlist" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { deleteFromWatchlist };
