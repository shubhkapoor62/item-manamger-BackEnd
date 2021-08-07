const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const SchoolClass = db.SchoolClass;

module.exports = {
    authenticate,
    getClasses,
    addClasses
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

async function getClasses() {
    return await SchoolClass.find();
}

async function addClasses(classList) {
    console.log('in add books')
    classList.forEach(element => {
        const schoolClass = new SchoolClass(element);
        schoolClass.save();
    });
}