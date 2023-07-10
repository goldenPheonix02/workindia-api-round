const db = require('../helpers/Connection');

module.exports = getUserData = async (email, callback) => {
  const inserts = [email];
  //   const sql = `select * from user where email = ` + db.escape(email);
  let sql = 'select * from users where email = ?';
  sql = db.format(sql, inserts);

  //   console.log(sql);

  db.query(sql, (err, results) => {
    if (err) throw err;
    callback(results);
  });
};
