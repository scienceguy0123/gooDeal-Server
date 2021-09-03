var express = require('express');

const mongoose = require('mongoose');
var passport = require('passport');
var Users = require('../models/user.js');
var authenticate = require('../authenticate');
var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended : false});
const cors = require('./cors');
const user_control = require('../controllers/user_controller');
const nodemailer = require('nodemailer');
const config = require('../config');
const jwt = require('jsonwebtoken');



const transporter = nodemailer.createTransport(({
  // host: "smtp-mail.outlook.com", // hostname
  // secureConnection: false, // TLS requires secureConnection to be false
  // port: 587, // port for secure SMTP
  // tls: {
  //    ciphers:'SSLv3'
  // },
  service: "gmail",
  auth: {
      user: config.EMAIL_USERNAME,
      pass: config.EMAIL_PASSWORD,
  },
}));


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
    
    const verificationToken = user.generateVerificationToken();
    
    const url = `http://localhost:5000/api/users/verify/${verificationToken}`;

    transporter.sendMail({
      from:config.EMAIL_USERNAME,
      to: req.body.username,
      subject: 'Verify Account',
      html: `Click <a href = '${url}'>here</a> to confirm your email.`
    }, (err, info) => {
      if(err) {
        res.status(400).json({err:err});
      }
      else{
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json( {user, success: true, status: 'Registration Successful! Please check the verifivation email'});
        });
      }
    })
    

  }
});
});

userRouter.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local',(err, user, info) => {
    if (err) {
      return next(err);
    } 
    //user can't be found, or user and password incorrect
    else if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Invalid username or password', err:info});
    }

    else if(!user.emailValidation){
      res.statusCoude = 403;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Email needs to be verified first', err:info});
    }
    else{
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
  }
  }) (req, res, next);
});

userRouter.get('/verify/:token', cors.corsWithOptions, async (req, res) => {
  const { token } = req.params
  // Check we have an id
  if (!token) {
      return res.status(422).send({ 
           message: "Missing Token" 
      });
  }
  // Step 1 -  Verify the token from the URL
  let payload = null
  try {
      payload = jwt.verify(
         token,
         config.USER_EMAIL_VERIFICATION_TOKEN_SECRET
      );
  } catch (err) {
      return res.status(404).send(err);
  }
  try{
      // Step 2 - Find user with matching ID
      const user = await Users.findOne({ _id: payload.ID }).exec();
      if (!user) {
         return res.status(404).send({ 
            message: "User does not  exists" 
         });
      }
      // Step 3 - Update user verification status to true
      user.emailValidation = true;
      await user.save();
      return res.status(200).send({
            message: "Account Verified"
      });
   } catch (err) {
      return res.status(500).send(err);
   }
  }
)

// (req, res, next) => {
//   const { token } = req.params
  
//   if (!token) {
//     return res.status(422).send({ 
//          message: "Missing Token" 
//     });
//   }

//   let payload = null
  
//   jwt.verify(token, config.USER_EMAIL_VERIFICATION_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       res.StatusCode = 500;
//       res.setHeader('Content-Type', 'application/json');
//       res.json('here');
//     }
//     else{
//       Users.findOne({_id:decoded.ID}).exec()
//       .then((user) => {
//         user.emailValidation = true;
//         user.save((err, result) => {
//           if (err) {
//             return res.status(500).send(err);
//           }
//           return res.status(200).send({
//             message: "Account Verified"
//           });
//         })
//       }, (err) => {
//         return res.status(404).send({ 
//           message: "User does not  exists" 
//        });
//       } )
//     }
//   });
// }



module.exports = userRouter;
