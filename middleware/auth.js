const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.SECRET);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        succes: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      succes: false,
      message: "something went wrong",
    });
  }
};

module.exports = { auth };
