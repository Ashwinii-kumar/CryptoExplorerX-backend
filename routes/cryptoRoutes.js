const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/signup");
const { login } = require("../controllers/login");
const { addToWatchlist } = require("../controllers/addToWatchlist");
const { getWatchlist } = require("../controllers/getWatchlist");
const { deleteFromWatchlist } = require("../controllers/deleteFromWatchlist");
const { auth } = require("../middleware/auth");
router.post("/signup", signup);
router.post("/login", login);
router.post("/addToWatchlist/:id", auth, addToWatchlist);
router.get("/getWatchlist/:id", auth, getWatchlist);
router.post("/deleteFromWatchlist/:id", auth, deleteFromWatchlist);

module.exports = router;
