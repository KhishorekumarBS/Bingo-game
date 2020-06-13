const mongoose = require('mongoose')
const User = require('./user.model').User

exports.create = function (req, res) {
  User.create(req.body, function (err, result) {
    if (err) {
      if(err.code === 11000){
        return res.json({data: "email already exist"});
      }
      return res.json({data: "Please try again later."});
    }
    return res.json(result);
  });
};


exports.login = function (req, res) {
  if(req.user == "Unknown user"){
        return res.json({status:"Not Exist"});
    }
    else if(req.user == "Invalid password"){
        return res.json({status:"Invalid Username and Password"});
    }
    else{
      return res.json(req.user);
    }
};


exports.logout = function (req, res) {
  req.logout();
  return res.json(req.user);
};

exports.authCallback = function (req, res) {
   return res.json(req.user);
};