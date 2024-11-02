const dotenv = require("dotenv");
dotenv.config();
const serverless = require('serverless-http')
const express = require("express");
const app = express();
const session = require('express-session');

app.use(express.static('public'));

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const authController = require('../../controllers/authController');
const bookController = require('../../controllers/bookController');
const isSignedIn = require('../..//middleware/isSignedIn');
const passUserToView = require('../../middleware/passUserToView');
const userController = require('../../controllers/userController');
const accountController = require('../../controllers/accountController');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);

app.use(passUserToView); 
app.use('/auth', authController);
app.use('/books', isSignedIn, bookController);
app.use('/user', userController);
app.use('/account', accountController);

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("home.ejs");
  });


  module.exports.handler = serverless(app)

