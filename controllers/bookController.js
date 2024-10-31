const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Assuming you have a Book model in models/book.js

// Show all books (Library Dashboard)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ user_id: req.session.user._id }); // Only show books for the logged-in user
    res.render('books/index', { books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.redirect('/');
  }
});

// Show form to add a new book
router.get('/new', (req, res) => {
  res.render('books/new');
});

// Show details of a specific book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/books');
    res.render('books/show', { book });
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

// Handle editing an existing book
router.post('/', async (req, res) => {
    try {
      const { title, author, genre, status, rating } = req.body;
      const newBook = new Book({
        title,
        author,
        genre,
        status,
        user_id: req.session.user._id,
        rating: status === 'Completed' ? rating : undefined, // Only save rating if status is Completed
      });
      await newBook.save();
      res.redirect('/books');
    } catch (error) {
      console.error("Error adding new book:", error);
      res.redirect('/books/new');
    }
  });
  
  // Handle editing an existing book
  router.put('/:id', async (req, res) => {
    try {
      const { title, author, genre, status, currentPage, totalPages, rating } = req.body;
      const updatedData = {
        title,
        author,
        genre,
        status,
        currentPage: currentPage || 0,
        totalPages: totalPages || 0,
      };
  
      if (status === 'Completed' && rating) {
        updatedData.rating = rating;
      } else {
        updatedData.rating = undefined;
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
