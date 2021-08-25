var express = require('express');
const mongoose = require('mongoose');
var Items = require('../models/item.js');
const cors = require('./cors');

const itemRouter = express.Router();
itemRouter.options('*', cors.corsWithOptions, (req, res) => {res.sendStatus(200);});

itemRouter.get('/:itemId', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.findById(req.params.itemId)
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = itemRouter;