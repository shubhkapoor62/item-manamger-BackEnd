const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Book = db.Book;

module.exports = {
    authenticate,
    getBooks,
    addBooks
};

async function authenticate({ username, password }) {
    console.log('in login')
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getBooks() {
    return await Book.find();
}

async function addBooks(bookArray) {
    console.log('in add books')
    bookArray.forEach(element => {
        const book = new Book(element);
        book.save();
    });
}