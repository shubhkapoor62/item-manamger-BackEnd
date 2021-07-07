const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Publisher = db.Publisher;

module.exports = {
    authenticate,
    getPublishers,
    addPublishers
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getPublishers() {
    return await Publisher.find();
}

async function addPublishers(PublisherList) {
    PublisherList.forEach(element => {
        const publisher = new Publisher(element);
        publisher.save();
    });
}