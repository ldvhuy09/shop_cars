var express = require('express');
var _hbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname,'app_server', 'views'));
var guestController = require('./app_server/controllers/guestController');

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
app.use(require('./app_server/routes/index'));
//app.use('/detail-product', menuController);
app.listen(8001, () => {
    console.log('Running on port 8001');
});

