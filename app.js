var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoose = require('mongoose');
const User = require('./models/user');
const mongourl = config.mongoUrl;
const connect = mongoose.connect(mongourl);
connect.then((db) => {
	console.log("Connected to mongodb");
},(err) => {
	console.log(err);
});


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



app.use(function(err, req, res, next) {

	if(!req.user)
	{
		console.log("User not authenticated");
	}
	else
	{
		console.log(req.user);
	}
	next();
});

app.use('/users', usersRouter);

module.exports = app;
