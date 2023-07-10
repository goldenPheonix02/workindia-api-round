const express = require('express');
const router = express.Router();
const authOperations = require('../controllers/auth');
const ValidationErrorHandler = require('../helpers/ValidationErrorHandler');
const { check, checkSchema, validationResult } = require('express-validator');

router.post(
  '/signup',
  [
    check('username').exists().withMessage('Name not passed'),
    check('email').exists().isEmail().withMessage('Invalid Email'),
    check('password').exists().withMessage('Password not found'),
  ],
  ValidationErrorHandler,
  authOperations.signup
);
router.post(
  '/login',
  [
    check('email').exists().isEmail().withMessage('Invalid Email'),
    check('password').exists().withMessage('Password not found'),
  ],
  ValidationErrorHandler,
  authOperations.login
);

module.exports = router;
