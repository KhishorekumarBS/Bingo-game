const mongoose = require('mongoose')
const userPlugin = require('mongoose-user')
const Schema = mongoose.Schema
const crypto = require('crypto')

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '', unique: true },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });

UserSchema.statics = {
   load: function (options, cb) {
      options.select = options.select;
      this.findOne(options.criteria)
        .select(options.select)
        .exec(cb);
    },
    create: function(data, callback) {
        var user = new this(data);
        console.log("Model:")
        console.log(data);
        console.log(user);
        
        user.save(callback);
    },
    get: function(id, callback) {
        this.findOne(id, callback);
    }
}



var validatePresenceOf = function (value) {
  return value && value.length;
};


UserSchema.methods = {
  authenticate: function (plainText) {
    console.log("User authenticate fn");
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },
  encryptPassword: function (password) {
    if (!password){
      return '';
    } 
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};


var user = mongoose.model('User', UserSchema);
module.exports = {
    User: user
};