var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('./authenticate');
var config = require('./config');
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');





const url = config.mongoUrl;
// const client = new MongoClient(url);

// async function run() {
//   try {
//       await client.connect();
//       console.log("Connected correctly to server");
//   } catch (err) {
//       console.log(err.stack);
//   }
//   finally {
//       await client.close();
//   }
// }
// run().catch(console.dir);

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

connect.then((db) => {
  console.log("connected correctly to db server");
}, (err) => {console.log(err);})

// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   console.log(err);
// });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let itemsRouter = require('./routes/items');
let itemRouter = require('./routes/item');

var app = express();

// Secure traffic only
// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
// app.use('/imageUpload', imageUploadRouter);

app.use('/api/item', itemRouter);




// function auth (req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     next(err);
//   }
//   else {
//         next();
//   }
// }

// app.use(auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
