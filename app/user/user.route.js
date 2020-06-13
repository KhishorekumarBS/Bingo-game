const User = require('./user.controller')

module.exports = function (app, passport) {
	app.post('/login',
	passport.authenticate('local', {
	}), User.login);
	app.post('/create', User.create);
	app.get('/logout', User.logout);
};