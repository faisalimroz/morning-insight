const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistedToken.model');

const blacklistToken = async (token) => {
  const decoded = jwt.decode(token);
  if (!decoded?.exp) {
    return;
  }

  await BlacklistedToken.findOneAndUpdate(
    { token },
    { token, expiresAt: new Date(decoded.exp * 1000) },
    { upsert: true },
  );
};

const isTokenBlacklisted = async (token) => {
  const found = await BlacklistedToken.findOne({ token }).lean();
  return !!found;
};

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
