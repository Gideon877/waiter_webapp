'use strict'
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');


const UsernameRoutes = require('./app');
const Route = require('./main');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiters');
const usernameRoutes = UsernameRoutes(models);
const route = Route('./models');
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

// registration page
app.get('/', function(req, res) {
    res.render('home');
});
app.post('/', usernameRoutes.home);

//logout screen
app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/')
});

// login page
app.get('/login', usernameRoutes.sign_in);
app.post('/login', usernameRoutes.login);

// waiter page
app.get('/waiters/:user_id', usernameRoutes.dashboard);
app.post('/waiters/:user_id', route.waiters);


// admin page
app.get('/days', route.days);
app.get('/reset', route.reset);


var port = app.get("port");

app.listen(port, function() {
    console.log('Server started at http://localhost:' + port)
});
