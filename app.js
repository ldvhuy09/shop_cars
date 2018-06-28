//DECALRE GLOBAL VARIABLE
var express = require('express');
var _hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var localLogin = require('passport-local');
var expressValid = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var paginate = require('express-paginate');
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);

//INIT APP EXPRESS
var app = express();

//SETUP PATH TO VIEWS
app.set('views', path.join(__dirname,'app_server', 'views'));

//INIT TEMPLATE ENGINE 
app.engine('hbs', _hbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: './app_server/views/layouts/',
    partialsDir: './app_server/views/partials/',
    helpers: {

        section: express_handlebars_sections()
    }
}));
app.set('view engine', 'hbs');


app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

var option = {
    host: 'ldvhuy09',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'CAR_SHOP'
};

var sessionStore = new MySQLStore(option);


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: sessionStore,
    cookie: {maxAge: 180 * 60 * 1000}
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValid({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

        while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
        }
        return {
        param : formParam,
        msg   : msg,
        value : value
        };
    }
}));

//  Connect flash
app.use(flash());
// Global Vars
app.use(function (req, res, next) {
    res.locals.signup_success = req.flash('signup_success');
    res.locals.update_success = req.flash('update_success');
    res.locals.change_pass_success = req.flash('change_pass_success');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.success_order = req.flash('success_order');
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
});


//USER EXPRESS-PAGINATE TO MAKE PAGINATION
app.use(paginate.middleware(10, 50));


//USE MIDDLEWARE
app.use(require('./app_server/routes/homeRoute'));
app.use(require('./app_server/routes/productRoute'));
app.use(require('./app_server/routes/userRoute'));
app.use(require('./app_server/routes/cartRoute'));
app.use(require('./app_server/routes/checkoutRoute'));

//LISTEN PORT 8001
app.listen(8001, () => {
    console.log('Running on port 8001');
});
