const router = require("express").Router();
const passport = require("passport");
const UserServices = require("../models/user");
const Channel = require("../models/channel");
const config = require("../config/oauthStrategy");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("https://real-time-chat-app-c18p.onrender.com/");
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.redirect("https://real-time-chat-app-c18p.onrender.com/");
});

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("https://real-time-chat-app-c18p.onrender.com/");
  }
);

router.post("/register", function (req, res, next) {
  UserServices.User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.json({
        message: "Username is already taken",
        loggedIn: false,
      });
    } else {
      UserServices.User.create(
        {
          username: req.body.username,
          password: req.body.password,
        },
        function (err, newUser) {
          Channel.findById("5fc52db79aa9fb091c81c332", function (err, channel) {
            if (err) {
              res.send("error finding welcome channel");
            } else {
              newUser.channels.push(channel);
              newUser.save();
              channel.members.push(newUser);
              channel.save();
            }
          });
          passport.authenticate("local", function (err, user, info) {
            if (err) {
              return next(err);
            }
            if (!user) {
              return res.json({ message: info.message, loggedIn: false });
            }
            req.login(user, function (err) {
              if (err) {
                return next(err);
              }
              return res.json({ loggedIn: true });
            });
          })(req, res, next);
        }
      );
    }
  });
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message, loggedIn: false });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({
        loggedIn: req.isAuthenticated(),
        user: req.user,
        session: req.session,
      });
    });
  })(req, res, next);
});

router.get("/status", (req, res) => {
  console.log("request status is", req.isAuthenticated());
  res.json(req.isAuthenticated());
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

module.exports = router;
