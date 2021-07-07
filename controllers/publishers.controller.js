const express = require('express');
const router = express.Router();
const publisherService = require('../masterData/publishers/publisher.service');

// routes
router.get('/publisher', getPublishers);
router.get('/addpublisher', addPublishers);

module.exports = router;

function getPublishers(req, res, next) {
    publisherService.getPublishers().then(resp => {
        resp.json();
    })
        .catch(err => {
            err.json();
        });
}

function addPublishers() {
    publisherService.addPublishers(

    ).then(resp => resp.json())
        .catch(error => {
            error.json();
        });
}