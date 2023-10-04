const mongoose = require("mongoose");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const uri=process.env.DATABASE_URL;
const dbConnect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
    })
    .then(() => console.log("connection to db established"))
    .catch((err) => {
      console.log("error while connecting to db");
      process.exit(1);
    });
};

module.exports = dbConnect;
