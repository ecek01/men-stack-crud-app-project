const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');  // Import Book model for separate queries

// Show a specific book (using Book model directly)
router.get('/:userId/books/:bookId', async (req, res) => {
  try {
    // Verify user exists
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return res.redirect('/');

    // Find the specific book by ID, ensuring it belongs to the user
    const book = await Book.findOne({ _id: req.params.bookId, user_id: currentUser._id });
    if (!book) return res.redirect(`/users/${req.params.userId}/books`);

    // Render the book detail view
    res.render('books/show.ejs', { book });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update a specific book (using Book model directly)
router.put('/:userId/books/:bookId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return res.redirect('/');

    // Update book directly by ID and ensure it belongs to the user
    const book = await Book.findOneAndUpdate(
      { _id: req.params.bookId, user_id: currentUser._id },
      req.body,
      { new: true }
    );
    if (!book) return res.redirect(`/users/${req.params.userId}/books`);

    // Redirect back to the show view of the updated book
    res.redirect(`/users/${req.params.userId}/books/${req.params.bookId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;
