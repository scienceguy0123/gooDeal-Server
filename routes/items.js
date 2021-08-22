var express = require('express');
const mongoose = require('mongoose');
var Items = require('../models/item.js');
const cors = require('./cors');

const itemRouter = express.Router();

itemRouter.options('*', cors.corsWithOptions, (req, res) => {res.sendStatus(200);});

itemRouter.post('/', cors.corsWithOptions, (req, res, next) => {
    Items.create(req.body)
    .then((item) => {
            console.log('item created: \n', item);
            res.StatusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(item);
        
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = itemRouter;