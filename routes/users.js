var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user');
const authenticate = require('../authenticate');
var passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).then((users) => {
  	res.setHeader('Content-Type','application/json');
  	res.json(users);
  },(err) => next(err));
});

router.post('/signup', (req, res, next) => {
	console.log(req.body.username);
	console.log(req.body.password);
	
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.json({err: err});
    }
    else {
		passport.authenticate('local')(req, res, () => {
			res.setHeader('Content-Type', 'application/json');
			res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err)
			return next(err);
		if (!user) 
		{
			res.setHeader('Content-Type', 'application/json');
			res.json({success: false, status: info.name});
    	}
    	else 
    	{
			req.logIn(user, (err) => {
				var token = authenticate.getToken({_id: req.user._id});
				res.setHeader('Content-Type', 'application/json');
				res.json({success: true, status: 'Login Successful!', token: token});
			}); 
    	}
	}) (req, res, next);
});


router.post('/hloo',authenticate.verifyUser,function(req, res, next) {
	// const usertoken = req.headers.authorization;
	// const token = usertoken.split(' ');
	// const decoded = jwt.verify(token[1], config.secretKey);
	// console.log("Decoded text:");
	// console.log(decoded);
	console.log(req.user._id);
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, status: 'ahhahahhahah!'});
});

module.exports = router;
