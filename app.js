var express = require('express');
var _hbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');
var app = express();

app.engine('hbs', _hbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    helpers: {
        section: express_handlebars_sections()
    }
}));
app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/', (req, res) => {
    res.redirect('home/index');
});
app.get('/home', (req, res) => {
  res.redirect('home/index');
});
app.get('/home/index', (req, res) => {
    res.render('home/index');
});
app.listen(8001, () => {
    console.log('Running on port 8001');
});

