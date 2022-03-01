const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const SchoolClass = db.SchoolClass;
const School = db.School;

module.exports = {
    authenticate,
    getClasses,
    getClassesForSchool,
    addClasses,
    addMasterClass,
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
    return await SchoolClass.find({ "schoolName": schoolName });
}

async function addClasses(classList) {
    console.log('in add class')
    for (const element of classList) {
        let classObj = {
            className: element.className,
            strength: element.strength
        }
        let schoolName = element.schoolName
        try {
            await School.update({
                'name': schoolName
            },
                { '$push': { 'classinfo': classObj } }
            );
        } catch (e) {
            throw e
        }
    }
}

async function addMasterClass(classList) {
    console.log('in add master class', classList)
    try {
        await SchoolClass.create({ className: classList.name, strength: 0 });
    } catch (e) {
        throw e
    }
}

async function deleteClasses(className) {
    console.log(className, 'hello');
    try {
        // return await School.deleteOne({ schoolName: schoolName, className: className });
        return await SchoolClass.deleteOne({ className: className });
    } catch (e) {
        throw e;
    }
}