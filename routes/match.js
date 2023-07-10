const express = require('express');
const router = express.Router();
const authOperations = require('../controllers/auth');
const matchOps = require('../controllers/match');
const ValidationErrorHandler = require('../helpers/ValidationErrorHandler');
const { check, checkSchema, validationResult } = require('express-validator');
const AuthChecker = require('../helpers/AuthChecker');

router.get('/get', matchOps.getMatches);
router.get('/:match_id', matchOps.getMatchDetails);
router.post('/add', AuthChecker, matchOps.addMatch);

module.exports = router;
