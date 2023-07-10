var express = require('express');
var mysql = require('mysql2');
const routes = require('./routes');
const app = express();
const ErrorHandler = require('./helpers/ErrorHandler');
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'nodemysql',
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/createdb', (req, res) => {
  let sql = 'create database nodemysql';
  db.query(sql, (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
});

//  create posts table

app.get('/createposttable', (req, res) => {
  let sql =
    'CREATE TABLE posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

app.post('/addpost', (req, res) => {
  let post = [[req.body.title, req.body.body]];
  // let sql = 'INSERT INTO posts(title, body) values ?';
  // let sql = `INSERT INTO posts(title, body) values('${req.body.title}', '${req.body.body}')`;
  // db.query(sql, (err, result) => {
  //   console.log(sql);
  //   console.log(result);
  //   res.send(result);
  // });
  post = { title: req.body.title, body: req.body.body };
  let sql = `INSERT INTO posts SET ?`;
  db.query(sql, post, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get('/getposts', (req, res) => {
  let sql = 'select * from posts where id > 4';
  db.query(sql, (err, r) => res.json(r));
});

app.use('/api', require('./routes'));
app.use(ErrorHandler);
module.exports = db;
