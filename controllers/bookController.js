const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ user_id: req.session.user._id });
    res.render('books/index', { books }); 
  } catch (error) {
    console.error("Error fetching books:", error);
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
  res.render('books/new');
});

router.post('/', async (req, res) => {
  try {
    const { title, author, genre, status, rating, currentPage, totalPages, coverUrl } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      status,
      user_id: req.session.user._id,
      rating: status === 'Completed' ? rating : undefined,
      currentPage: status === 'Reading' ? currentPage : undefined,
      totalPages: status === 'Reading' ? totalPages : undefined,
      coverUrl
    });
    await newBook.save();
    res.redirect('/books');
  } catch (error) {
    console.error("Error adding new book:", error);
    res.redirect('/books/new');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.render('books/show', { book }); 
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.redirect('/books');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/books');
    res.render('books/edit', { book });
  } catch (error) {
    console.error("Error fetching book for editing:", error);
    res.redirect('/books');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, author, genre, status, currentPage, totalPages, rating, coverUrl } = req.body;
    const updatedData = {
      title,
      author,
      genre,
      status,
      currentPage: status === 'Reading' ? currentPage : 0,
      totalPages: status === 'Reading' ? totalPages : 0,
      coverUrl
    };
    if (status === 'Completed' && rating) {
      updatedData.rating = rating;
    }
    await Book.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.redirect(`/books/${req.params.id}`);
  } catch (error) {
    console.error("Error updating book:", error);
    res.redirect(`/books/${req.params.id}/edit`);
  }
});

router.delete('/:id', async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.redirect('/books');
    } catch (error) {
      console.error("Error deleting book:", error);
      res.redirect('/books');
    }
  });
  

module.exports = router;
