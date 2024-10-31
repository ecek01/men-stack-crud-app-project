const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// Show the account page
router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login'); // Redirect if not logged in

  // Pass null for both errors on the initial load
  res.render('account', { user: req.session.user, usernameError: null, passwordError: null });
});

// Update username with availability check
router.post('/update-username', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    // Check if the new username is already taken
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return res.render('account', { 
        user: req.session.user, 
        usernameError: 'Username is already taken. Please choose a different one.',
        passwordError: null 
      });
    }

    // Update username if it's unique
    user.username = req.body.username;
    await user.save();

    req.session.user = user; // Update session with new username
    res.redirect('/account');
  } catch (error) {
    console.error("Error updating username:", error);
    res.redirect('/account');
  }
});

// Update password with old password verification
router.post('/update-password', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    // Verify the old password
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return res.render('account', { 
        user: req.session.user, 
        usernameError: null, 
        passwordError: 'Old password is incorrect.' 
      });
    }

    // Check if new password matches the confirmation password
    if (req.body.password !== req.body.confirmPassword) {
      return res.render('account', { 
        user: req.session.user, 
        usernameError: null, 
        passwordError: 'New passwords do not match. Please try again.' 
      });
    }

    // Hash and save the new password
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
    // Find the current user based on session data
    const userId = req.session.user._id;

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    // Destroy the session
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
