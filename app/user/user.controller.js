const mongoose = require('mongoose')
const User = require('./user.model').User

exports.create = function (req, res) {
  console.log("Controller:")
  console.log(req.body);
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
  console.log("Controller login fn");
  if(req.user == "Unknown user"){
        return res.json({auth:"0",status:"Not Exist"});
    }
    else if(req.user == "Invalid password"){
        return res.json({auth:"0",status:"Invalid Username and Password"});
    }
    else{
      return res.json({auth:"1",status:req.user.name});
    }
};


exports.logout = function (req, res) {
  req.logout();
  return res.json(req.user);
};

exports.authCallback = function (req, res) {
   return res.json(req.user);
};