const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login'); 

  res.render('account', { user: req.session.user, usernameError: null, passwordError: null });
});

router.post('/update-username', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return res.render('account', { 
        user: req.session.user, 
        usernameError: 'Username is already taken. Please choose a different one.',
        passwordError: null 
      });
    }

    user.username = req.body.username;
    await user.save();

    req.session.user = user; 
    res.redirect('/account');
  } catch (error) {
    console.error("Error updating username:", error);
    res.redirect('/account');
  }
});

router.post('/update-password', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return res.render('account', { 
        user: req.session.user, 
        usernameError: null, 
        passwordError: 'Old password is incorrect.' 
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.render('account', { 
        user: req.session.user, 
        usernameError: null, 
        passwordError: 'New passwords do not match. Please try again.' 
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();

    res.redirect('/account');
  } catch (error) {
    console.error("Error updating password:", error);
    res.redirect('/account');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const userId = req.session.user._id;

    await User.findByIdAndDelete(userId);

    req.session.destroy(() => {
      console.log("User deleted successfully.");
      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.json({ success: false, message: "An error occurred. Please try again." });
  }
});


module.exports = router;
