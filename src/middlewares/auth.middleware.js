const jwtService = require('../services/jwt.service');
const AppError = require('../utils/AppError');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwtService.verify(token);
    if (!decoded || (!decoded.id && !decoded.userId)) {
      return next(new AppError('Unauthorized', 401));
    }
    
    // Append req.user = { id: decoded.id } as requested
    req.user = { id: decoded.id || decoded.userId };
    next();
  } catch (err) {
    return next(new AppError('Unauthorized', 401));
  }
};

module.exports = authenticate;
