const express = require('express');
const router = express.Router();
const db = require('../helpers/Connection');
const { getData } = require('../helpers/SqlOps');

const teamOps = {};

teamOps.addPlayer = (req, res) => {
  const { team_id } = req.params;
  const data = {
    name: req.body.name,
  };
  const sql = 'insert into players set ?';
  db.query(sql, data, (err, result) => {
    console.log(err);
    if (err) return res.json({ error: 'error occurred' });
    const player_id = result.insertId;
    // console.log(result);
    // console.log(player_id);
    const data = {
      player_id,
      team_id,
      ...req.body,
    };
    let sql2 = 'insert into squad set ?';
    db.query(sql2, data, (err, result) => {
      console.log(err);
      if (err) return res.json({ error: 'error occured' });
      res.json({ status: 'Player added succesfully', player_id });
    });
  });
};

teamOps.getPlayerStats = (req, res) => {
  const { player_id } = req.params;

  getData('players', 'player_id', player_id, ([result]) => {
    if (!result) return res.json({ status: 'no player found' });
    res.json(result);
  });
};

module.exports = teamOps;
