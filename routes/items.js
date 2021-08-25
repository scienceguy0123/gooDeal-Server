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

itemRouter.get('/', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({}).sort({'createdAt': 'desc'})   
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

itemRouter.get('/clothes', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Cloth"}, {"ItemType2": "Cloth"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = itemRouter;