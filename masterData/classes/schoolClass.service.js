const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const SchoolClass = db.SchoolClass;

module.exports = {
    authenticate,
    getClasses,
    getClassesForSchool,
    addClasses,
    deleteClasses
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

async function getClassesForSchool(schoolName) {
    console.log(schoolName, 'dshfhsdfvbhj');
    return await SchoolClass.find({"schoolName": schoolName});
}

async function addClasses(classList) {
    console.log('in add class')
    classList.forEach(element => {
        const schoolClass = new SchoolClass(element);
        schoolClass.save();
    });
}

async function deleteClasses(schoolName, className) {
    console.log(schoolName, 'hello');
    try {
        return await School.deleteOne({ schoolName: schoolName, className: className});
    } catch (e) {
        throw e;
    }
}