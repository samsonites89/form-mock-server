/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("public"));

// routes
// const restrictMiddleware = require("./restrict");
const indexRouter = require("./routes/index");
// const loginRouter = require("./routes/login");
const formRouter = require("./routes/form");
const configRouter = require("./routes/config");

// app.use("/login", loginRouter);
app.use("/form", formRouter);
// app.use(restrictMiddleware);
app.use("/", indexRouter);
app.use("/configs", configRouter);

exports.app = functions.https.onRequest(app);
