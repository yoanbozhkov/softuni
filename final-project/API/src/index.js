const cors = require("cors");
const express = require("express");
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const router = require("./routes");
const { authMiddleware } = require("./middleware/authMiddleware");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);
app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/angular-project");

mongoose.connection.on("connected", () => console.log("DB is connected"));
mongoose.connection.on("error", (err) => console.log(err));

app.listen(5000, () => {
  console.log("App is listening on http://127.0.0.1:5000/");
});
