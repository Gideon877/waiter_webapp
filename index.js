'use strict'
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const moment = require('moment');


// const Route = require('./src/app');
const Route = require('./src/waiter/steps');
const Screen = require('./src/waiter/screens');
// const Handler = require('./src/waiter/handler');
const Models = require('./src/waiter/models/main');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiters');

const route = Route(models);
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
        httpOnly: false,
        maxAge: 60000 * 30,
        secure: true
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash()); // set up http session

// home page
app.get('/', screen.homePage)

// registration page
app.get('/signUp', screen.signUp);
app.post('/signUp', route.Register);

//logout screen
app.get('/logout', function(req, res) {
    const timestamp = moment.utc().local().format();
    let user = req.session;
    if(user && user.timestamp) {
        user.timestamp.lastSeen = timestamp;
    }
    req.session.destroy();
    res.redirect('/login');
});

// login page
app.get('/login', screen.signIn);
app.post('/signIn', route.signIn);

// app.post('/add', route.addDays);

// waiter page
app.get('/waiter/:id', screen.waiter)
app.get('/waiter/:id/profile', screen.profile);
app.get('/waiter/:id/inbox', screen.inbox);
app.get('/waiter/:id/schedule', screen.schedule);
app.get('/waiter/:id/friends', screen.friends);

app.post('/waiter/:id/schedule', route.schedule);
// app.post('/waiter', handler.waiterHome);
// app.post('/waiter/:user_id', route.waiters);

// admin page
app.get('/admin/:id', screen.admin);
app.get('/admin/:id/profile', screen.profile);
app.get('/admin/:id/inbox', screen.inbox);
app.get('/admin/:id/schedule', screen.schedule);
app.get('/admin/:id/employee', screen.friends);
// app.get('/reset', route.reset);

var port = app.get("port");

app.listen(port, function() {
    console.log('Server started at http://localhost:' + port)
});
