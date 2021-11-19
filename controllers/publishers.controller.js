const express = require('express');
const router = express.Router();
const publisherService = require('../masterData/publishers/publisher.service');

// routes
router.get('/', getPublishers);
router.post('/add', addPublishers);
router.post('/import', importPublishers);
router.put('/update', updatePublisher);
router.delete('/delete', deletePubisher);

module.exports = router;

function getPublishers(req, res, next) {
    publisherService.getPublishers().then(resp => {
        res.send(resp);
    })
        .catch(err => {
            next(err);
        });
}

function addPublishers(req, res, next) {
    publisherService.addPublishers(req.body).then(resp => {
        res.send('Publishers added succeesfully');
    })
        .catch(error => {
            // next(error);
            console.error(error);
            res.send('error in adding publishers');
        });
}

function updatePublisher(req, res, next) {
    publisherService
        .updatePublisher(req.body)
        .then(resp => {
            console.log('in update publisher then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": resp
            };
            res.json(respObj);
        });
}

function importPublishers(req, res, next) {
    publisherService
        .importallPublisher(req.body)
        .then(resp => {
            console.log('in import books', resp);
            respObj = {
                "allbooks": resp
            };
            res.json(resp);
        })
}

function deletePubisher(req, res, next) {
    let pubName = req.query.publisher;
    console.log(pubName);
    publisherService
        .deletePublisher(pubName)
        .then(resp => {
            console.log('in delete Publisher', resp);
            respObj = {
                "message": resp
            };
            res.json(respObj);
        })
        .catch(err => console.log(err));
}