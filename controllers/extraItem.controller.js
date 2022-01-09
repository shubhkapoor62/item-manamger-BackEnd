const express = require('express');
const router = express.Router();
const extraItemService = require('../masterData/extraItems/extraItem.service');

// routes
router.get('/', getExtraItems);
router.post('/add', addExtras);
router.post('/import', importExtraItems);
router.delete('/delete', deleteExtra);

module.exports = router;

function getExtraItems(req, res, next) {
    extraItemService
        .getExtras()
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

function addExtras(req, res, next) {
    extraItemService
        .addExtras(req.body)
        .then(resp => {
            console.log('in add extra then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": 'Item added'
            };
            res.json(respObj);
        })
        .catch(err => {
            console.log('in add item error response', err);
            throw 'in add item error response'
        });
}

function importExtraItems(req, res, next) {
    extraItemService
        .importallExtras(req.body)
        .then(resp => {
            console.log('in import extraItems', resp);
            respObj = {
                "extraItems": resp
            };
            res.json(resp);
        })
}

function deleteExtra(req, res, next) {
    let itemName = req.query.itemName;
    extraItemService
        .deleteExtra(itemName)
        .then(resp => {
            console.log('in delete item', resp);
            respObj = {
                "message": resp
            };
            res.json(respObj);
        })
        .catch(err => console.log(err));
}
