
var loadContent = require('../model/loadContentPage');

exports.index = function(req, res) {
  loadContent.dataHomePage().then(result => {
    res.render('home/index', result);
  }); 
};

