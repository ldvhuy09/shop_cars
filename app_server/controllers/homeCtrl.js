
var loadData = require('../model/loadData');

exports.index = function(req, res) {
  loadData.dataHomePage().then(result => {
    res.render('home/index', result);
  }); 
};

