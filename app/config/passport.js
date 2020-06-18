const User = require('../user/user.model').User;
const local = require('./passport/local');

module.exports = function (passport) {
  console.log("Going to serialize");
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  passport.use(local);
};