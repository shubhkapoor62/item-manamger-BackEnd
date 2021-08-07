const express = require('express');
const router = express.Router();
const customerService = require('../masterData/customers/customer.service');

// routes
router.get('/', getCustomers);
router.post('/add', addCustomers);

module.exports = router; 

function getCustomers(req, res, next) {
    customerService
        .getCustomers()
        .then(resp => {
            console.log('get Customers');
            res.json(resp)}
            )
        .catch(err => next(err));
}

function addCustomers(req, res, next) {
    customerService
        .addCustomers(req.body)
        .then(resp => {
            console.log('Customers added');
            res.json(resp)
        })
        .catch(err => {
            next(err)
            console.log('Error in adding the customers');
        });
}