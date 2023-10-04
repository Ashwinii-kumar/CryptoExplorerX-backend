const mongoose = require("mongoose");
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;

    //validation
    // 1. if empty inputs
    if (!email || !password || !cpassword) {
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

    if (!validator.isLength(password, { min: 8 })) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long." });
    }
    //3. check password strength
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password must contain a mix of lowercase and uppercase letters, numbers, and special characters.",
      });
    }
    //4/ check password and cpassword match or not
    if (cpassword !== password) {
      return res.status(400).json({ error: "Passwords do not match." });
    }
    //if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //secure password
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "some error ocurred",
      });
    }

    //create a entry in db
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "user signed in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "signup not possible,try again later",
    });
  }
};

module.exports = { signup };
