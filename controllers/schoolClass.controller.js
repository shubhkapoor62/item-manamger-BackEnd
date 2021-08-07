const express = require('express');
const router = express.Router();
const schoolClassService = require('../masterData/classes/schoolClass.service');

// routes
router.get('/', getClasses);
router.post('/add', addClasses);

module.exports = router; 

function getClasses(req, res, next) {
    schoolClassService
        .getClasses()
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

function addClasses(req, res, next) {
    schoolClassService
        .addClasses(req.body)
        .then(resp => {
            console.log('Classes added');
            res.json(resp)
        })
        .catch(err => {
            next(err)
            console.log('Error in Classes addition');
        });
}