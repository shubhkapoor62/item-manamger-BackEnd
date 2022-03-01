const express = require('express');
const router = express.Router();
const requirementService = require('../masterData//requirement/requirement.service');

// routes
router.get('/', getRequirement);
router.post('/add', addRequirement);
router.put('/update', updateRequirement);
router.delete('/delete', deleteRequirement);

module.exports = router;

function getRequirement(req, res, next) {
    let schoolId = req.query.schoolId;
    let classId = req.query.classId;
    requirementService
        .getRequirement(schoolId, classId)
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

function addRequirement(req, res, next) {
    requirementService
        .addRequirement(req.body)
        .then(resp => {
            console.log('in add requirement then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": `Requirement added ${resp}`
            };
            res.json(respObj);
        })
        .catch(err => {
            console.log('in add requirement error response', err);
            throw 'in add requirement error response'
        });
}

function updateRequirement(req, res, next) {
    requirementService
        .updateRequirement(req.body)
        .then(resp => {
            console.log('in update requirement then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": resp
            };
            res.json(respObj);
        });
}

function deleteRequirement(req, res, next) {
    let bookName = req.query.bookName;
    requirementService
        .deleteRequirement(bookName)
        .then(resp => {
            console.log('in delete requirement', resp);
            respObj = {
                "message": resp
            };
            res.json(respObj);
        })
        .catch(err => console.log(err))  ;
}
