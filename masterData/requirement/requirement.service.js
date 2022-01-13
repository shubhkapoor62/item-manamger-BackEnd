const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Requirement = db.Requirement;


module.exports = {
    authenticate,
    getRequirement,
    addRequirement,
    updateExtras,
    updateBooksTransact,
    resetRequirement
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

async function getRequirement(schoolId, classId) {
    return await Requirement.find({schoolId: schoolId, classId: classId});
}

async function addRequirement(requirementList) {
    requirementList.forEach(element => {
        const requireItem = new Requirement(element);
        requireItem.save(element);
    });
}

async function updateExtras(bookdata) {
    // return await Book.replaceOne({ bookName: { $eq: bookdata.bookName } },
    //    bookdata
    // );
}

async function updateBooksTransact(bookdata) {
    // return await Book.replaceOne({ bookName: { $eq: bookdata.bookName } },
    //    bookdata
    // );
}

async function resetRequirement(bookName) {
    // console.log(bookName, 'hello');
    // try {
    //     return await Book.deleteOne({ bookName: bookName });
    // } catch (e) {
    //     throw e;
    // }
}



