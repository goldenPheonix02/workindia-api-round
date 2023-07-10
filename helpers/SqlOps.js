const db = require('../helpers/Connection');

const dbops = {};

dbops.getData = (table, param, value, callback) => {
  const inserts = [table, param, value];
  sql = db.format('select * from ?? where ?? = ?', inserts);
  let res;
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) throw err;
    res = results;
    callback(res);
  });
};

module.exports = dbops;
