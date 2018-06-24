var async = require('async');
var TypeCarDAO = require('./DAO/typeDAO').typeDAO;
var BrandCarDAO = require('./DAO/brandDAO').brandDAO;

var menuUser = {
  catelogies: {
    type: null,
    brand: null
  },
  shopCart: null
};


var menuAdmin = {};

var dataTypeCar = new TypeCarDAO();
var dataBrandCar = new BrandCarDAO();

exports.loadMenuUser = () => {
  return new Promise((resolve, reject) => {
    var menu = {
      catelogies: {},
      shopCart: {}      
    };
    dataTypeCar.getAll().then(rows=> {
      menu.catelogies.type = rows;
    }).catch((error)=> {
      reject(error);
    });
    dataBrandCar.getAll().then (rows => {
      menu.catelogies.brand = rows;
    }).catch((error) => {
      reject(error);
    });
    resolve(menu);
  });
};
