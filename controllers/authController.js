const express = require('express');
const router = express.Router();
const User = require('../models/user.js');  // Assumes you've created a User model in models/user.js
const bcrypt = require('bcrypt');        // For hashing passwords

// Show registration form
router.get('/register', (req, res) => {
  res.render('auth/register');  // Renders register.ejs
});

// Handle registration form submission
router.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.render('auth/register', { error: 'Passwords do not match.' });
    }
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('auth/register', { error: 'Username is already taken.' });
      }
  
      // Hash the password and create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
  
      console.log("New user created");  // Log the created user for verification
  
      // Redirect to the login page after successful registration
      res.redirect('/auth/login');
    } catch (error) {
      console.error("Error creating user:", error);
      res.render('auth/register', { error: 'An error occurred. Please try again.' });
    }
  });

// Show login form
router.get('/login', (req, res) => {
  res.render('auth/login');  // Renders login.ejs
});

// Handle login form submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log("User found during login:", user);  // Log the user found during login

    if (!user) {
      return res.render('auth/login', { error: 'Invalid username or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);  // Log the result of password comparison

    if (!passwordMatch) {
      return res.render('auth/login', { error: 'Invalid username or password.' });
    }

    // Set the user session
    req.session.user = user;

    // Redirect to the home page on successful login
    res.redirect('/');
  } catch (error) {
    console.error("Error during login:", error);
    res.render('auth/login', { error: 'An error occurred. Please try again.' });
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');  // Redirect to home after logout
  });
});

module.exports = router;
