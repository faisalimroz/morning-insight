const jwt = require('jsonwebtoken');

const JWT_EXPIRES_IN = '7d';

const sign = (id, type = 'user') =>
  jwt.sign({ userId: id, id, type }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const verify = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { sign, verify, JWT_EXPIRES_IN };
