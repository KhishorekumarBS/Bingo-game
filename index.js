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

// Bootstrap routes
require('./app/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);