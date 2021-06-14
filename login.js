const config = require("./config");
const password = config.password; // Get the admin password

// Check if whoever it is is logged in
exports.isLoggedIn = (req, res, next) => {
  if(req.session.blah === password) // If the session matches our password
    next();
  else
    res.render("login.html");
}

// Try logging in
exports.login = (req, res) => {
  if(req.body.password === password) {
    req.session.blah = password; // Store the session
    res.sendStatus(200);
  }
  else
    res.sendStatus(401); // User not authorized because of the wrong password
}

exports.logout = (req, res) => {
  req.session.blah = null; // Make our session unworkable
  res.redirect("/admin"); // Re-redirect to login page for admin
}

// Make sure whoever tries to delete something is allowed to
exports.deleteAuth = (req, res, next) => {
  if(req.session.blah === password) {
    next();
  } else
    res.sendStatus(401);
}
