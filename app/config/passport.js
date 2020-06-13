const User = require('../user/user.model').User;
const local = require('./passport/local');

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  passport.use(local);
};