const User = require('../models/user.model');
const jwtService = require('../services/jwt.service');
const AppError = require('../utils/AppError');

const adminAuthenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwtService.verify(token);
    const userId = decoded?.id || decoded?.userId;

    if (!userId) {
      return next(new AppError('Unauthorized', 401));
    }

    const user = await User.findById(userId).select('-password');
    if (!user || user.role !== 'admin') {
      return next(new AppError('Forbidden: admin access required', 403));
    }

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return next(new AppError('Unauthorized', 401));
  }
};

module.exports = adminAuthenticate;
