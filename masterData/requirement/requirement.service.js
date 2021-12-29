const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Book = db.Book;

module.exports = {
    authenticate,
    getBooks,
    addBooks,
    updateBook,
    deleteBook,
    importallBooks
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
    bookArray.forEach(element => {
        const book = new Book(element);
        book.save(element);
    });
}

async function updateBook(bookdata) {
    return await Book.replaceOne({ bookName: { $eq: bookdata.bookName } },
       bookdata
    );
}

async function importallBooks(bookArray) {
    console.log(bookArray, 'in importallBooks');
    Book.remove({});
    Book.insertMany(bookArray);
}

async function deleteBook(bookName) {
    console.log(bookName, 'hello');
    try {
        return await Book.deleteOne({ bookName: bookName });
    } catch (e) {
        throw e;
    }
}



