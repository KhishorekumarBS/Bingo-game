var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var rooms = require('./room');

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

app.post('/createroom',authenticate.verifyUser,function(req, res, next) {
	room_code=rooms.createRoom();
	res.setHeader('Content-Type', 'application/json');
	res.json({'roomcode':room_code});
});

app.post('/joinroom',authenticate.verifyUser,function(req, res, next) {
	// let message = await rooms.enterRoom(room_code,req.user.username);
	rooms.enterRoom(req.body.roomcode,req.user.username).then(function(message) {
		res.setHeader('Content-Type', 'application/json');
		if(message=="UserLimitExceeded")
			res.json({'status':false,'message':"Room Capacity exceeded"});
		else if(message=="Joined")
			res.json({'status':true});
		else
			res.json({'status':false,'message':"Please try again"});
	});
});

app.post('/updatescore',authenticate.verifyUser,function(req, res, next) {
	rooms.updateScore(req.body.roomcode,req.user.username,req.body.score);
	res.setHeader('Content-Type', 'application/json');
	res.json({'status':true});
});

app.post('/getnumandscore',authenticate.verifyUser,function(req, res, next) {
	num=rooms.getRandomCall(req.body.roomcode,req.body.index);
	updated_score=rooms.updateScore(req.body.roomcode,req.user.username,req.body.score);
	res.setHeader('Content-Type', 'application/json');
	res.json({'random_number':num , 'score':updated_score });
});

app.post('/getwinner',authenticate.verifyUser,function(req, res, next) {
	winner=rooms.getWinner(req.body.roomcode,req.body.index);
	res.setHeader('Content-Type', 'application/json');
	res.json({'winner':winner});
});



// app.post('/joinroom',authenticate.verifyUser,function(req, res, next) {
// 	room_code=rooms.createRoom();
// 	rooms.joinRoom(room_code,req.user.username);
// 	res.setHeader('Content-Type', 'application/json');
// 	res.json({roomcode:room_code});
// });

// app.post('/updatescore',authenticate.verifyUser,function(req, res, next) {
// 	rooms.updatescore(room_code,req.user.username,req.body.score);
// 	res.setHeader('Content-Type', 'application/json');
// 	res.json({roomcode:room_code});
// });


module.exports = app;
