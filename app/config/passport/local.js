const LocalStrategy = require('passport-local').Strategy;
const User = require('../../user/user.model').User;

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log("local.js");
    console.log(email);
    console.log(password);
    var options = {
      criteria: { email: email },
      select: 'name email hashed_password salt'
    };
    User.load(options, function (err, user) {
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      else if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      else { 
        return done(null, user);
      }
    });
  }
);