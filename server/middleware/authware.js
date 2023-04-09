module.exports = {
  isLoggedIn: (req, res, next) => {
    console.log("AUTH STATUS", req.isAuthenticated());
    if (!req.isAuthenticated()) {
      res.json({
        isLoggedIn: false,
      });
    } else {
      return next();
    }
  },
};
