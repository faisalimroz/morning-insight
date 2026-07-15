const Admin = require('../models/admin.model');
const jwtService = require('../services/jwt.service');
const { isTokenBlacklisted } = require('../services/token.service');
const AppError = require('../utils/AppError');

const adminAuthenticate = async (req, res, next) => {
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
    const adminId = decoded?.id || decoded?.userId;

    if (!adminId || decoded?.type !== 'admin') {
      return next(new AppError('Unauthorized', 401));
    }

    const admin = await Admin.findById(adminId).select('-password');
    if (!admin) {
      return next(new AppError('Forbidden: admin access required', 403));
    }

    req.admin = { id: admin._id.toString() };
    req.user = { id: admin._id.toString(), type: 'admin' };
    next();
  } catch (err) {
    return next(new AppError('Unauthorized', 401));
  }
};

module.exports = adminAuthenticate;
