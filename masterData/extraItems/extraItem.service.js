const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const ExtraItems = db.ExtraItems;

module.exports = {
    authenticate,
    getExtras,
    addExtras,
    deleteExtra,
    importallExtras
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

async function getExtras() {
    return await ExtraItems.find();
}

async function addExtras(bookArray) {
    bookArray.forEach(element => {
        const book = new ExtraItems(element);
        book.save(element);
    });
}

async function deleteExtra(bookdata) `98764\{
    console.log(bookName, 'hello');
    try {
        return await ExtraItems.deleteOne({ bookName: bookName });
    } catch (e) {
        throw e;
    }
}

async function importallExtras(bookArray) {
    console.log(bookArray, 'in importallExtras');
    ExtraItems.remove({});
    ExtraItems.insertMany(bookArray);
}
