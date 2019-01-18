'use strict'
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const Handler = require('./src/handler');
const Screen = require('./src/screens');
const Models = require('./src/schema/model');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiters');
const handler = Handler(models);
const screen = Screen(models);
const app = express();

app.set("port", (process.env.PORT || 4444))

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
// app.use(session({cookieName: 'session', secret: 'random_string_goes_here', duration: 30 * 60 * 1000, activeDuration: 5 * 60 * 1000,}));
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash()); // set up http session

// Authorization of user login details
app.get('/', screen.signIn);
app.post('/', handler.signIn);

app.get('/signUp', screen.signUp);
app.post('/signUp', handler.signUp);

//logout screen
app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});


// waiter page
app.get('/waiters/:id', screen.waiter);
app.post('/waiters/:id', screen.waiter);

// admin page
// app.get('/days', handler.getWaitersDays);
// app.get('/reset', handler.resetWeeklyShift);

var port = app.get("port");

app.listen(port, function() {
    console.log('Server started at http://localhost:' + port)
});
