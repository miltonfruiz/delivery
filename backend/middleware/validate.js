const { body, validationResult } = require('express-validator');

const rules = [
  body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;