const { request } = require('express');
const express = require('express');
const router = express.Router();
const schoolClassService = require('../masterData/classes/schoolClass.service');

// routes
router.get('/', getClasses);
router.post('/global/add', addMasterClass);
router.post('/add', addClasses);
router.post('/delete', deleteClasses);

module.exports = router; 

function getClasses(req, res, next) {
    if(req.query.field) {
        schoolClassService
        .getClassesForSchool(req.query.field)
        .then(resp => res.json(resp))
        .catch(err => next(err));
    } else {
        schoolClassService
        .getClasses()
        .then(resp => res.json(resp))
        .catch(err => next(err));
    }
   
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
            console.log('Error in Classes addition', err);
        });
}

function addMasterClass(req, res, next) {
    console.log('in master class add');
    schoolClassService
        .addMasterClass(req.body)
        .then(resp => {
            console.log('Classes added');
            res.json(resp)
        })
        .catch(err => {
            next(err)
            console.log('Error in Classes addition', err);
        });
}

function deleteClasses(req, res, next) {
    let schoolName = req.query.schoolName;
    let className = req.query.className;
    schoolClassService
        .deleteClasses(schoolName, className)
        .then(resp => {
            console.log('in delete Class', resp);
            respObj = {
                "message": resp
            };
            res.json(respObj);
        })
        .catch(err => console.log(err))  ;
}