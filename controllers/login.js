const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields must be set",
      });
    }

    // 2. if email is invalid
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email is invalid",
      });
    }

    //if email exists
    //   Y=> check if password is matching
    //   N=>return error saying first signup

    const findMatch = await User.findOne({ email: email }).exec();
    if (!findMatch) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const payload = {
      email: findMatch.email,
    };

    if (await bcrypt.compare(password, findMatch.password)) {
      //assign jwt token and send it in response
      let token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "3d",
      });
      findMatch.token = token;
      findMatch.password = undefined;

      return res.status(200).json({
        success: true,
        message: "login successfull",
        token: token,
        user: findMatch._id,
      });
    } else {
      return res.status(400).json({
        message: "Password not correct",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { login };
