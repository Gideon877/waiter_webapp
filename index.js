'use strict'
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const Register = require('./route/register');
const Login = require('./route/signin');
const Admin = require('./route/admin');
const Waiter = require('./route/waiter');


const Models = require('./models/models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiters');
const app = express();

const register = Register(models);
const login = Login(models);
const waiter = Waiter(models);
const admin = Admin(models);

app.set("port", (process.env.PORT || 3002))

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
app.post('/', register.home);

//logout screen
app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

// login page
app.get('/login', login.sign_in);
app.post('/login', login.login);

// waiter page
app.get('/waiters/:userId', waiter.dashboard);
app.post('/waiters/:userId', waiter.waiters);

// admin page
app.get('/days', admin.days);
app.get('/reset', admin.reset);

var port = app.get("port");

app.listen(port, function() {
    console.log('Server started at http://localhost:' + port)
});
