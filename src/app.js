require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const mainpage = require("./things/things-router");
const postcard = require("./reviews/reviews-router");
const viewpostcard = require("./auth/authRouter");
const signup = require("./auth/authRouter");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

app.use("/api/mainpage", mainpage);
app.use("/api/postcard", postcard);
app.use("/api/viewpostcard", viewpostcard);
app.use("/api/signup", signup);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
