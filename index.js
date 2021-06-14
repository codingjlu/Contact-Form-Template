const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator'); // Validate

const cookieSession = require('cookie-session'); // Cookie version of express-session; It's encrypted, only the server can decrypt it

const path = require("path");

// Import our other files
const { submit, getAll, deleteOne, deleteAll, getOne } = require('./form');
const { login, isLoggedIn, logout, deleteAuth } = require('./login');

const config = require('./config');

app.engine('html', require('ejs').renderFile); // We use EJS as the templating engine
app.set('view engine', 'html');
app.use(express.urlencoded({
  extended: true
}));
app.set('views', path.join(__dirname, "/views/")); // When we call views, we don't have to use the entire path again since it is already set; just call the file name
app.use(express.static(path.join(__dirname, '/public/'))); // Folder that client can access
app.use(express.json()); // JSON!!!!!!!! 😂
app.set('trust proxy', 1); // trust first proxy
 
app.use(cookieSession({
  name: 'blahblahblah', // Why not?
  keys: ['blah']
}));

// Front page
app.get('/', (req, res) => {
  res.render('contact.html', {
    name: config.name,
  });
});

// Handle contact form submit + validation + sanitazation
app.post('/',
body('email').isEmail().isLength({ max: 60 }),
body('message').not().isEmpty().trim().escape().isLength({ max: 2000 }),
body('name').not().isEmpty().trim().escape().isLength({ max: 50 }),
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Send an error
  }

  // Call the submit function
  submit({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  }, function() {
    res.sendStatus(200); // Send "Success" back to the user
  });
});

// Route for admin
app.get('/admin', isLoggedIn /* Makes sure user is logged in */, async (req, res) => {
  // Get all submissions
  getAll(function(result) {
    res.render("admin.html", {
      all: result,
      name: config.name
    });
  });
});

// Handle request to login and logout. Bruteforce keeps someone from trying to log in too many times
app.post('/login', login);
app.post('/logout', logout);

// Delete an entry
app.post('/delete', deleteAuth, (req, res) => {
  deleteOne(req.body.key, () => {
    res.sendStatus(200);
  });
});

// 404 - you can make a better page if you like
app.use((req, res) => {
  res.sendStatus(404);
});

// Run the server
app.listen(80, () => {
  console.clear();
  console.log("Our contact form is working!");
});
