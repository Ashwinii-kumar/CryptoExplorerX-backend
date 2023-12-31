const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const dbConnect = require("./config/database");
//connect to db
dbConnect();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/cryptoRoutes");

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`server running at port:${PORT}`);
});

//default route
app.get("/", (req, res) => {
  res.status(200).json({
    success:true,
    message:"Server is up and running",
  });
});
