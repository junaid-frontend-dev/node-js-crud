const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successful.");

    app.listen(PORT, () => {
      console.log(`Server Run on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/auth", authRoute);
app.use("/users", userRoute);
