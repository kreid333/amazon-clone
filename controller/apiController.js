const db = require("../models");
const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const passport = require("passport");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IR8z9EtaHaa4E63gC0QEM4B1pCVrMBXov09QhT5bXe5cwnWBKNLWRlPHBOa0cW7pM4ingXVElYZFiOi9heiCpVQ00Ih1zrcfA"
);
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
      req.login(user, (err) => {
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

router.post("/payments/create", async (req, res) => {
  try {
    const total = req.query.total;
    console.log("Payment request received for this amount", total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // SUBUNITS OF CURRENCY
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch {
    console.log("There has been an error proccessing your payment");
  }
});

router.post("/orders", (req, res) => {
  db.Orders.create(req.body)
    .then((response) => {
      db.User.findOneAndUpdate(
        { _id: response.user },
        {
          $push: { orders: response._id },
        },
        { new: true }
      )
        .populate("orders")
        .then((data) => {
          console.log(data);
          console.log("Success!");
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

router.get("/orders/:id", (req, res) => {
  db.User.findById(req.params.id)
    .populate("orders")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
module.exports = router;
