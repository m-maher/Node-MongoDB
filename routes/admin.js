const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../contoller/admin')

router.post('/add-data',adminController.postAddData);

router.get('/add-data',adminController.getAddData);

router.get('/get-data', adminController.getData);

router.get('/edit-product/:productId', adminController.getEditData);

router.post('/edit-product', adminController.postEditData);

router.post('/delete-product', adminController.postDeleteData);

module.exports = router;