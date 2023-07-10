var express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const matchRoutes = require('./match');
const teamRoutes = require('./teams');
const teamOps = require('../controllers/teams');
router.get('/players/:player_id/stats', teamOps.getPlayerStats);
router.use('/admin', authRoutes);

router.use('/matches', matchRoutes);
router.use('/teams', teamRoutes);

module.exports = router;
