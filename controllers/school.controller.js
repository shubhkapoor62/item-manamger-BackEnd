﻿const express = require('express');
const router = express.Router();
const schoolService = require('../masterData/schools/school.service');

// routes
router.get('/', getSchools);
router.post('/add', addSchool);
router.post('/import', importSchools);
router.put('/update', updateSchool);
router.delete('/delete', deleteSchool);

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
            next(err);
            console.log('Error In add school');
        });
}

function updateSchool(req, res, next) {
    schoolService
        .updateSchool(req.body)
        .then(resp => {
            console.log('in update school then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": resp
            };
            res.json(respObj);
        });
}

function importSchools(req, res, next) {
    schoolService
        .importallSchools(req.body)
        .then(resp => {
            console.log('in import schools', resp);
            respObj = {
                "allSchool": resp
            };
            res.json(resp);
        })
}

function deleteSchool(req, res, next) {
    let schoolName = req.query.school;
    schoolService
        .deleteSchool(schoolName)
        .then(resp => {
            console.log('in delete School', resp);
            respObj = {
                "message": resp
            };
            res.json(respObj);
        })
        .catch(err => console.log(err))  ;
}