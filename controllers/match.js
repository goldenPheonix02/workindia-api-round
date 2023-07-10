const express = require('express');
const router = express.Router();
const db = require('../helpers/Connection');
const { getData } = require('../helpers/SqlOps');

const matchOps = {};

matchOps.addMatch = async (req, res) => {
  const { team_1, team_2, date, venue } = req.body;
  const sql = 'INSERT INTO matches set ?';
  const data = {
    team_1,
    team_2,
    match_date: date,
    venue,
    team1_id: 0,
    team2_id: 0,
  };
  //   console.log(data);

  getData('team', 'name', team_1, ([team1]) => {
    if (!team1) {
      return res.json({
        status: 'No such team found',
      });
    }
    data.team1_id = team1.team_id;
    getData('team', 'name', team_2, ([team2]) => {
      if (!team2) {
        return res.json({
          status: 'No such team found',
        });
      }
      data.team2_id = team2.team_id;
      db.query(sql, data, (err, result) => {
        console.log(result);
        res.json({
          status: 'Match created successfully',
          match_id: result.insertId,
        });
      });
    });
  });
};

matchOps.getMatches = async (req, res) => {
  const sql = 'select * from matches where match_date > NOW()';
  db.query(sql, (err, result) => {
    console.log();
    if (err)
      res.status(500).json({
        error: 'Could not fetch!',
      });
    res.json(result);
  });
};

matchOps.getMatchDetails = async (req, res) => {
  console.log(req.params);

  const sql_match = `select * from matches where match_id = ${req.params.match_id}`;
  db.query(sql_match, (err, [result]) => {
    const response = { ...result, team_1: {}, team_2: {} };
    const team1_id = result.team1_id;
    const team2_id = result.team2_id;
    const sql_team1 = `select sq.name, sq.player_id, sq.role from (select * from matches where match_id = ${req.params.match_id}) m inner join squad sq on m.team1_id = sq.team_id`;

    // const response = {};
    db.query(sql_team1, (err, results) => {
      // console.log(sql11);
      //   res.json(results);
      response.team1 = results;
      const sql_team2 = `select sq.name, sq.player_id, sq.role from (select * from matches where match_id = ${req.params.match_id}) m inner join squad sq on m.team2_id = sq.team_id`;

      // const response = {};
      db.query(sql_team2, (err, results) => {
        // console.log(sql11);
        //   res.json(results);
        response.team2 = results;
        res.json(response);
      });
    });
  });

  return;
  //   const sql = `select * from matches where match_id = ${req.params.match_id}`;
  //   db.query(sql, (err, [result]) => {
  //     const { team_1, team_2, team1_id, team2_id } = result;

  //     const response = {
  //       ...result,
  //       team_1: {},
  //       team_2: {},
  //     };
  //     getData('squad', 'team_id', team1_id, (squads1) => {
  //       response.team_1.squads = squads1;

  //       getData('squad', 'team_id', team2_id, (squads2) => {
  //         response.team_2.squads = squads2;
  //         res.json(response);
  //       });
  //     });
  //   });
};
module.exports = matchOps;
