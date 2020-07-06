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
	
	User.register(new User({username: req.body.username,name: req.body.name}), req.body.password, (err, user) => {
    if(err) {
			res.setHeader('Content-Type', 'application/json');
			res.json({'success': false, 'status': err.name});
    }
    else {
		passport.authenticate('local')(req, res, () => {
			res.setHeader('Content-Type', 'application/json');
			res.json({'success': true, 'status': 'Registration Successful!'});
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
				res.json({success: true, status: 'Login Successful!', token: token,name: user.name});
			}); 
    	}
	}) (req, res, next);
});

router.post('/changepassword',authenticate.verifyUser, (req, res, next) => {
	User.findByUsername(req.user.username).then(function(sanitizedUser){
    if (sanitizedUser){
        sanitizedUser.setPassword(req.body.newpassword, function(){
            sanitizedUser.save();
            res.status(200).json({message: 'password reset successful'});
        });
    } else {
        res.status(500).json({message: 'This user does not exist'});
    }
},function(err){
    console.error(err);
})
});

router.post('/changename',authenticate.verifyUser, (req, res, next) => {
	User.updateOne({ _id:req.user._id }, { name: req.body.newname }, function(err,result) 
	{
		if (err) { res.json({'status':false,'error':err});} 
		else { res.json({'status':false,'user':result});}
	});
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
