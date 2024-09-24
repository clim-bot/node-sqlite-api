const express = require('express');
const router = express.Router();
const { createBook, getBooks } = require('../controllers/bookController');
const authenticateToken = require('../middlewares/authMiddleware');

// Protect these routes
router.post('/books', authenticateToken, createBook);
router.get('/books', authenticateToken, getBooks);

module.exports = router;
