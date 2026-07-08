const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const AppError = require('../utils/AppError');

const client = jwksClient({ jwksUri: 'https://appleid.apple.com/auth/keys' });

const getSigningKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
};

const verifyToken = async (idToken) => {
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        idToken,
        getSigningKey,
        {
          algorithms: ['RS256'],
          audience: process.env.APPLE_CLIENT_ID,
          issuer: 'https://appleid.apple.com',
        },
        (err, payload) => {
          if (err) reject(err);
          else resolve(payload);
        }
      );
    });

    return {
      providerId: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };
  } catch {
    throw new AppError('Invalid token', 500);
  }
};

module.exports = { verifyToken };
