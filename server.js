const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require('express-session');

const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');
const isSignedIn = require('./middleware/isSignedIn');
const passUserToView = require('./middleware/passUserToView');
const userController = require('./controllers/userController');
const accountController = require('./controllers/accountController');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));

// Apply session middleware before other middleware that depends on it
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);

app.use(passUserToView); // Now session will be available here
app.use('/auth', authController);
app.use('/books', isSignedIn, bookController);
app.use('/user', userController);
app.use('/account', accountController);

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    // Render home.ejs and let the view determine what to show based on user session
    res.render("home.ejs");
  });


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

