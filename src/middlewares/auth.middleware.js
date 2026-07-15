const jwtService = require('../services/jwt.service');
const { isTokenBlacklisted } = require('../services/token.service');
const AppError = require('../utils/AppError');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    if (await isTokenBlacklisted(token)) {
      return next(new AppError('Unauthorized', 401));
    }

    const decoded = jwtService.verify(token);
    if (!decoded || (!decoded.id && !decoded.userId)) {
      return next(new AppError('Unauthorized', 401));
    }

    if (decoded.type === 'admin') {
      return next(new AppError('Unauthorized', 401));
    }

    req.user = { id: decoded.id || decoded.userId, type: decoded.type || 'user' };
    next();
  } catch (err) {
    return next(new AppError('Unauthorized', 401));
  }
};

module.exports = authenticate;
