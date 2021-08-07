const express = require('express');
const router = express.Router();
const publisherService = require('../masterData/publishers/publisher.service');

// routes
router.get('/', getPublishers);
router.post('/add', addPublishers);

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