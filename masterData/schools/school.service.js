const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const School = db.School;

module.exports = {
    authenticate,
    getSchools,
    addSchool,
    updateSchool,
    deleteSchool,
    importallSchools
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

async function getSchools() {
    return await School.find();
}

async function addSchool(schoolArray) {
    console.log('in add School')
    schoolArray.forEach(element => {
        const school = new School(element);
        school.save();
    });
}

async function updateSchool(schooldata) {
    return await School.replaceOne({ name: { $eq: schooldata.name } },
        schooldata
    );
}

async function importallSchools(schoolArray) {
    console.log(schoolArray, 'in importallSchool');
    School.remove({});
    School.insertMany(schoolArray);
}

async function deleteSchool(schoolName) {
    console.log(schoolName, 'hello');
    try {
        return await School.deleteOne({ name: schoolName });
    } catch (e) {
        throw e;
    }
}