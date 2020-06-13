module.exports = function (app, passport) {
	require('./user/user.route')(app, passport);
};