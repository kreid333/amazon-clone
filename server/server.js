// IMPORTING PACKAGES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportlocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

// DEFINING PORT
const PORT = process.env.PORT || 3001;

// CREATING INSTANCE OF EXPRESS
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("client/build"));

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// COOKIE PARSER
app.use(cookieParser("secretCode"));

// SESSION
app.use(
  session({
    // SECRET USED TO SIGN SESSION COOKIE
    secret: "secretCode",
    // FORCES SAVE BACK TO SESSION STORE
    resave: true,
    // FROCES TO SAVE A SESSION THAT IS UNINITIALIZED
    saveUninitialized: true,
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// CONNECTING TO MONGODB DATABASE
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/amazonClone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// TESTING CONNECTION TO DATABASE
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

// TESTING GET REQUEST ON SERVER
// app.get("/api/config", (req, res) => {
//   console.log("Success!");
//   res.json({
//     success: true,
//   });
// });

// API ROUTES
const apiRoutes = require("./controller/apiController");
app.use(apiRoutes);

// LISTENING ON LOCALHOST
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

// REACT STATIC BUILD FOLDER AND GET ROUTE
// app.use(express.static("client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
