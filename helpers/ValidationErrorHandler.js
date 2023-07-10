const { check, checkSchema, validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ ValidationError: error.array() });
  } else {
    next();
  }
};
