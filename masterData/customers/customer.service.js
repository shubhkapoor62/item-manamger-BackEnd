const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Customer = db.Customer;

module.exports = {
    authenticate,
    getCustomers,
    addCustomers
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

async function getCustomers() {
    return await Customer.find();
}

async function addCustomers(customerArray) {
    customerArray.forEach(element => {
        const customer = new Customer(element);
        customer.save();
    });
}