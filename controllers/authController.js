const express = require('express');
const router = express.Router();
const User = require('../models/user.js');  
const bcrypt = require('bcrypt'); 

router.get('/register', (req, res) => {
  res.render('auth/register'); 
});

router.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.render('auth/register', { error: 'Passwords do not match.' });
    }
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('auth/register', { error: 'Username is already taken.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
  
      console.log("New user created"); 

      res.redirect('/auth/login');
    } catch (error) {
      console.error("Error creating user:", error);
      res.render('auth/register', { error: 'An error occurred. Please try again.' });
    }
  });

router.get('/login', (req, res) => {
  res.render('auth/login'); 
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log("User found during login:", user);

    if (!user) {
      return res.render('auth/login', { error: 'Invalid username or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.render('auth/login', { error: 'Invalid username or password.' });
    }

    req.session.user = user;

    res.redirect('/');
  } catch (error) {
    console.error("Error during login:", error);
    res.render('auth/login', { error: 'An error occurred. Please try again.' });
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); 
  });
});

module.exports = router;
