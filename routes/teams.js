const express = require('express');
const router = express.Router();
const authOperations = require('../controllers/auth');
const teamOps = require('../controllers/teams');
const ValidationErrorHandler = require('../helpers/ValidationErrorHandler');
const { check, checkSchema, validationResult } = require('express-validator');
const AuthChecker = require('../helpers/AuthChecker');

router.post('/:team_id/squad', AuthChecker, teamOps.addPlayer);

module.exports = router;
