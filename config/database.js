const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connection to db established"))
    .catch((err) => {
      console.log("error while connecting to db");
      process.exit(1);
    });
};

module.exports = dbConnect;
