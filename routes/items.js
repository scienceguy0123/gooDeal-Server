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

itemRouter.get('/shoes', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Shoes"}, {"ItemType2": "Shoes"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

itemRouter.get('/eletronics', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Eletronic"}, {"ItemType2": "Eletronic"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

itemRouter.get('/books', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Book"}, {"ItemType2": "Book"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

itemRouter.get('/furniture', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Furniture"}, {"ItemType2": "Furniture"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

itemRouter.get('/stationaries', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Stationary"}, {"ItemType2": "Stationary"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

itemRouter.get('/collectibles', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Collectible"}, {"ItemType2": "Collectible"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})


itemRouter.get('/services', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Service"}, {"ItemType2": "Service"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

itemRouter.get('/others', cors.corsWithOptions, (req, res, next) => {
    // res.end('Will send all the dishes to you');
    Items.find({ $or:[ {"ItemType1": "Other"}, {"ItemType2": "Other"}]}).sort({'createdAt': 'desc'})  
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

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