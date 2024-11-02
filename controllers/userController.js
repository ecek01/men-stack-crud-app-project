const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book'); 

router.get('/:userId/books/:bookId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return res.redirect('/');

    const book = await Book.findOne({ _id: req.params.bookId, user_id: currentUser._id });
    if (!book) return res.redirect(`/users/${req.params.userId}/books`);

    res.render('books/show.ejs', { book });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:userId/books/:bookId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return res.redirect('/');

    const book = await Book.findOneAndUpdate(
      { _id: req.params.bookId, user_id: currentUser._id },
      req.body,
      { new: true }
    );
    if (!book) return res.redirect(`/users/${req.params.userId}/books`);

    res.redirect(`/users/${req.params.userId}/books/${req.params.bookId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;
