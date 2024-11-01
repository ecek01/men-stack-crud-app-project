const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Show all books (Library Dashboard)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ user_id: req.session.user._id });
    res.render('books/index', { books }); // Ensure 'books/index' exists in views
  } catch (error) {
    console.error("Error fetching books:", error);
    res.redirect('/');
  }
});

// Show form to add a new book
router.get('/new', (req, res) => {
  res.render('books/new'); // Ensure 'books/new' exists in views
});

// Handle adding a new book (Create)
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

// Show details of a specific book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.render('books/show', { book }); // Ensure 'books/show' exists in views
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.redirect('/books');
  }
});

// Show form to edit an existing book
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

// Handle editing an existing book (Update)
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

// Handle deleting a book
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
