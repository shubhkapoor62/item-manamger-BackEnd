const express = require('express');
const router = express.Router();
const bookService = require('../masterData/books/book.service');

// routes
router.get('/', getBooks);
router.post('/add', addBooks);
router.post('/import', importBooks);
router.put('/update', updateBook);
router.delete('/delete', deleteBook);

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
            console.log('in add book then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": 'Books added'
            };
            res.json(respObj);
        })
        .catch(err => {
            console.log('in add book error response', err);
            throw 'in add book error response'
        });
}

function updateBook(req, res, next) {
    bookService
        .updateBook(req.body)
        .then(resp => {
            console.log('in update book then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": resp
            };
            res.json(respObj);
        });
}

function importBooks(req, res, next) {
    bookService
        .importallBooks(req.body)
        .then(resp => {
            console.log('in import books', resp);
            respObj = {
                "allbooks": resp
            };
            res.json(resp);
        })
}

function deleteBook(req, res, next) {
    let bookName = req.query.bookName;
    bookService
        .deleteBook(bookName)
        .then(resp => {
            console.log('in delete Book', resp);
            respObj = {
                "message": resp
            };
            res.json(respObj);
        })
        .catch(err => console.log(err))  ;
}
