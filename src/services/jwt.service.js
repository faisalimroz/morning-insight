const jwt = require('jsonwebtoken');

const JWT_EXPIRES_IN = '7d';

const sign = (userId) =>
  jwt.sign({ userId, id: userId }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const verify = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { sign, verify };
