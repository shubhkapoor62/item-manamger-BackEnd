const express = require('express');
const router = express.Router();
const schoolService = require('../masterData/schools/school.service');

// routes
router.get('/', getSchools);
router.post('/add', addSchool);

module.exports = router; 

function getSchools(req, res, next) {
    schoolService
        .getSchools()
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

function addSchool(req, res, next) {
    schoolService
        .addSchool(req.body)
        .then(resp => {
            console.log('in add school success');
            res.json(resp)
        })
        .catch(err => {
            next(err)
            console.log('Error In add school');
        });
}