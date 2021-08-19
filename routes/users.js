var express = require('express');

const mongoose = require('mongoose');
var passport = require('passport');
var Users = require('../models/user.js');
var authenticate = require('../authenticate');
var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended : false});



const userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with all registered users');
});

userRouter.post('/register', (req, res, next) => {
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

userRouter.post('/login', passport.authenticate('local'), (req, res, next) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json( { success: true, status:"logged in"})
});

module.exports = userRouter;
