var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var User = require ('./daos/user_daos')

var securityMiddleware = require("./middlewares/security");

var connectDB = require("./client/mongo");

require("dotenv").config();
require("./routes/index");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/Users/user_routes");
//const { connect } = require('http2');

connectDB();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // This is important for cookies or auth headers
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors(corsOptions));
app.use(cors());

app.use(securityMiddleware.checkJWT);

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
