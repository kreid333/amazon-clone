const db = require("../models");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        db.User.findOne({ email: email }, (err, user) => {
          if (err) {
            throw err;
          }

          if (!user) {
            return done(null, false);
          }

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              throw err;
            }
            if (result === true) {
              done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    db.User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        id: id,
        email: user.email,
      };
      cb(err, userInformation);
    });
  });
};
