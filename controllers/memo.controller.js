﻿const express = require('express');
const router = express.Router();
const deliveryMemoService = require('../masterData/deliverymemo/delivery.service');

// routes
router.get('/', getDeliveryMemo);
router.get('/getbyId', getDeliveryMemoById);
router.post('/add', createDeliveryMemo);
router.post('/update', updateDeliveryMemo);
router.put('/delete', deleteDeliveryMemo);

module.exports = router;

function getDeliveryMemo(req, res, next) {
    deliveryMemoService
        .getDeliveryMemo()
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

function getDeliveryMemoById(req, res, next) {
    let memoId = req.query.memoId;
    console.log(memoId);
    deliveryMemoService
        .getDeliveryMemoById(memoId)
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

function createDeliveryMemo(req, res, next) {
    deliveryMemoService
        .createDeliveryMemo(req.body)
        .then(resp => {
            console.log('in create delivery memo then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": 'Delivery Memo added',
                "bookObj": req.body
            };
            res.json(respObj);
        })
        .catch(err => {
            console.log('in create delivery error response', err);
            throw 'in create delivery memo error response'
        });
}

function updateDeliveryMemo(req, res, next) {
    deliveryMemoService
        .createDeliveryMemo(req.body)
        .then(resp => {
            console.log('in update book then response', resp + '@#$#$#$#$#');
            respObj = {
                "message": resp
            };
            res.json(respObj);
        });
}

function deleteDeliveryMemo(req, res, next) {
    let memoId = req.query.memoId;
    deliveryMemoService
        .deleteDeliveryMemo(memoId)
        .then(resp => {
            console.log('in delete Book', resp);
            respObj = {
                "message": resp
            };
            res.json(respObj);
        })
        .catch(err => console.log(err))  ;
}
