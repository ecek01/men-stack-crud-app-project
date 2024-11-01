// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: String,
    status: { type: String, enum: ['To-Read', 'Reading', 'Completed'], required: true },
    currentPage: { type: Number, default: 0 },
    totalPages: { type: Number, default: 0 },
    rating: { type: Number, min: 1, max: 5 },
    coverUrl: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Book', bookSchema);
