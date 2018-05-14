var db = require('../fn/db');

exports._loadAll = (_table) => {
  var sql = `select * from ${_table}`
  return db.load(sql);
};

exports._single = (_table, _att, _val) => {
  return new Promise((resolve, reject) => {
    var sql = `select * from ${_table} where ${_att} = ${_val}`;
    db.load(sql).then(rows => {
      if (rows.length === 0)
        resolve(null);
      else 
        resolve(rows[0]);
    }). catch(err => {
      reject(err);
    });
  });
};

exports._add = (_table, _att, _val) => {
  var sql = `insert into ${_table}(${_att}) values('${_val}')`;
  return db.save(sql);
};

exports._delete = (_table, _att, _val) => {
  var sql = `delete from ${_table} where ${_att} = ${_val}`;
  return db.save(sql);
};


exports._update = (_table, _att, _val, _att_id, _id) => {
  var sql = `update ${_table} set ${_att} = ${_val} where ${_att_id} = ${_id}`;
  return db.save(sql);
};