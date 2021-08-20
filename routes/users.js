var express = require('express');

const mongoose = require('mongoose');
var passport = require('passport');
var Users = require('../models/user.js');
var authenticate = require('../authenticate');
var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended : false});
const cors = require('./cors');



const userRouter = express.Router();
userRouter.options('*', cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
/* GET users listing. */
userRouter.get('/', cors.corsWithOptions, function(req, res, next) {
  res.send('respond with all registered users');
});

userRouter.post('/register', cors.corsWithOptions, (req, res, next) => {
  Users.register(new Users({username: req.body.username, email: req.body.username}), 
  req.body.password, (err, user) => {
  if(err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({err: err});
  }
  else {
    passport.authenticate('local')(req, res, () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json( {user, success: true, status: 'Registration Successful!'});
    });
  }
});
});

userRouter.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local',(err, user, info) => {
    if (err) {
      return next(err);
    } 
    //user can't be found, or user and password incorrect
    if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Failed', err:info});
    }
    
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Failed', err:'could not login user'});
      }

    let token = authenticate.getToken({_id: req.user._id})
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({user, success: true, status: 'Login', token:token});
    });
  }) (req, res, next);
});

module.exports = userRouter;
