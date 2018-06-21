var mysql = require('mysql');

exports.load = sql => {
  return new Promise((resolve, reject) => {
    var cn = mysql.createConnection({
      host: 'ldvhuy09',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'CAR_SHOP'
    });

    cn.connect();

    cn.query(sql, function(error, rows, fields) {
      if (error) 
        reject(error);
      else 
        resolve(rows);
      
      cn.end();
    });
  });
};

exports.save = sql => {
  return new Promise((resolve, reject) => {
    var cn = mysql.createConnection({
      host: 'ldvhuy09',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'CAR_SHOP'
    });

    cn.connect();

    cn.query(sql, function(error, value=null) {
      if (error) 
        reject(error);
      else 
        resolve(value);
      
      cn.end();
    });
  });
}