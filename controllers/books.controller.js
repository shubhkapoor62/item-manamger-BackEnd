const express = require('express');
const router = express.Router();
const bookService = require('../masterData/books/book.service');

// routes
router.get('/books', getBooks);
router.post('/addBooks', addBooks);

module.exports = router; 

function getBooks(req, res, next) {
    bookService
        .getBooks()
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

function addBooks(req, res, next) {
    bookService
        .addBooks(req.body)
        .then(resp => {
            console.log('in add book then response');
            res.json(resp)
        })
        .catch(err => {
            next(err)
            console.log('in add book then response');
        });
}