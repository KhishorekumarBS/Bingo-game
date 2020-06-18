const express = require('express')
const passport = require('passport')
const db = require('./app/config/db')

const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 9000

app.use(cookieParser());
app.use(expressSession({secret:'jiljiljigajiga'}));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

require('./app/config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

require('./app/routes')(app, passport);

app.get('/testing', function(req, res) {
	if(!req.session.passport)
		res.json({ data:"Login pantu va da mayiru" });	
	else
		res.json({ data:"Va da va da" }); 
});


app.listen(port);
console.log('Express app started on port ' + port);