const jwtService = require('../services/jwt.service');
const userService = require('../services/user.service');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwtService.verify(token);
  const user = await userService.getUserById(decoded.userId);

  if (!user) {
    throw new AppError('User not found', 401);
  }

  req.user = user;
  next();
});

module.exports = authenticate;
