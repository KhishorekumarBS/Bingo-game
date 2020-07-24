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
app.use(express.static(path.join(__dirname, 'frontend/dist/bingassign')));
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

app.use('/api/users', usersRouter);

app.get('/',function(req, res, next) {
	res.sendFile(path.join(__dirname, 'frontend/dist/bingassign/index.html'));
});

app.post('/api/createroom',authenticate.verifyUser,function(req, res, next) {
	room_code=rooms.createRoom();
	res.setHeader('Content-Type', 'application/json');
	res.json({'roomcode':room_code});
});

app.post('/api/joinroom',authenticate.verifyUser,function(req, res, next) {
	// let message = await rooms.enterRoom(room_code,req.user.username);
	rooms.joinRoom(req.body.roomcode,req.user.name).then(function(players_status) {
		res.setHeader('Content-Type', 'application/json');
		if(players_status=="UserLimitExceeded")
			res.json({'status':false,'status':"Room Capacity exceeded"});
		else
			res.json({'status':true,'players':players_status});
	});
});

app.post('/api/updatescore',authenticate.verifyUser,function(req, res, next) {
	rooms.updateScore(req.body.roomcode,req.user.username,req.body.score);
	res.setHeader('Content-Type', 'application/json');
	res.json({'status':true});
});

app.post('/api/getrandomcall',authenticate.verifyUser,function(req, res, next) {
	if(req.body.gameover=="true")
	{
		winner=rooms.getWinner(req.body.roomcode,req.body.index);
		updated_score=rooms.updateScore(req.body.roomcode,req.user.name,req.body.score);
		res.setHeader('Content-Type', 'application/json');
		res.json({'winner':winner,'score':updated_score,'gameended':'true'});
	}
	else
	{
		rooms.getRandomCall(req.body.roomcode,req.body.turnsend,req.body.random_number
		,req.body.iterations).then(function(randnum) {
			updated_score=rooms.updateScore(req.body.roomcode,req.user.name,req.body.score);
			if(randnum=="game_ended")
			{
				winner=rooms.getWinner(req.body.roomcode,req.body.index);
				res.setHeader('Content-Type', 'application/json');
				res.json({'winner':winner,'score':updated_score,'gameended':'true'});				
			}
			res.setHeader('Content-Type', 'application/json');
			res.json({'random_number':randnum,'score':updated_score,'gameended':'false'});
		});		
	}
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
