const db = require("../models");
const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const passport = require("passport");
const router = express.Router();
// require("../config/passportConfig")(passport);

router.post("/api/register", (req, res) => {
  db.User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) {
      throw err;
    }
    if (doc) {
      res.send("User already exists.");
    }
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User created.");
    }
  });
  //   db.User.create(req.body)
  //     .then((response) => {
  //       res.json(response);
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         throw err;
  //       }
  //     });
  console.log(req.body);
});

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // console.log(user);
    // console.log(info);
    // console.log(req.body);
    if (err) {
      throw err;
    }

    if (!user) {
      res.send("No user exists.");
    } else {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }
        res.send("Successfully authenticated");
        console.log("req.user below");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.get("/api/user", (req, res) => {
  res.send(req.user);
});

router.get("/api/logout", (req, res) => {
  res.send(req.logOut());
  console.log("Successfully logged out");
});

module.exports = router;
