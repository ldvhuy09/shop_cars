var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from _TYPE_CAR';
    return db.load(sql);
}
