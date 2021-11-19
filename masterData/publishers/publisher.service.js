const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Publisher = db.Publisher;

module.exports = {
    authenticate,
    getPublishers,
    addPublishers,
    updatePublisher,
    deletePublisher,
    importallPublisher
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

async function updatePublisher(publisherData) {
    return await Publisher.replaceOne({ name: { $eq: publisherData.name } },
        publisherData
    );
}

async function importallPublisher(bookArray) {
    console.log(bookArray, 'in importallBooks');
    Publisher.remove({});
    Publisher.insertMany(bookArray);
}

async function deletePublisher(publisherData) {
    try {
        return await Publisher.deleteOne({ name: publisherData });
    } catch (e) {
        throw e;
    }
}