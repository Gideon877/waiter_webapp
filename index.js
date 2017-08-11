const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');


const UsernameRoutes = require('./main');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiters');
const usernameRoutes = UsernameRoutes(models);
const app = express();

app.set("port", (process.env.PORT || 4444))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30}, resave: true, saveUninitialized: true}));
app.use(flash()); // set up http session

// registration page
app.get('/', usernameRoutes.home);
app.post('/', usernameRoutes.home);

app.get('/logout', function(req, res){
    console.log('Session', req.session);
    res.redirect('/')
});

// login page
app.get('/login', usernameRoutes.login);
app.post('/login', usernameRoutes.login);

// waiter page
app.get('/waiters/:user_id', usernameRoutes.waiters);
app.post('/waiters/:user_id', usernameRoutes.waiters);


// admin page
app.get('/days', usernameRoutes.days);


var port = app.get("port");

app.listen(port, function() {
    console.log('Server started at http://localhost:' + port)
});
