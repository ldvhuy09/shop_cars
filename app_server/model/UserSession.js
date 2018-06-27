var db = require('../fn/db');

exports.loadSessionDataForUser = (id) => {
  return new Promise((resolve, reject) => {
    sql = `select dataSession from USER_SESSION where uid = \"${id}\"`;
    db.load(sql).then(result => {
      resolve(result[0]);
    }).catch(err => {
      reject(err);
    });
  });
};

exports.addSessionDataForUser = (id, data) => {
  return new Promise((resolve, reject) => {
    sql = `insert into USER_SESSION value(\"${id}\", \'${data}\');`
    db.save(sql).then(result => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
};

exports.saveSessionDataForUser = (id, data) => {
  return new Promise((resolve, reject) => {
    sql = `update USER_SESSION set dataSession = \'${data}\' where uid = \"${id}\";`
    db.save(sql).then(result => {
      resolve();
    }).catch(err => {
      reject(err);
    })
  })
}

exports.updateDataSessionInSessionTable = (sessionid, data) => {
  return new Promise((resolve, reject) => {
    sql = `update sessions set data = \'${data}\' where session_id = \"${sessionid}\";`;
    db.save(sql).then(result => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  })
}