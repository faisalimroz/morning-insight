const adminAuthService = require('../services/admin.auth.service');
const jwtService = require('../services/jwt.service');
const { sendSuccess } = require('../utils/response');

const register = async (req, res) => {
  const admin = await adminAuthService.registerAdmin(req.body);
  const token = jwtService.sign(admin._id, 'admin');

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Admin registered successfully',
    token,
    data: admin,
  });
};

const login = async (req, res) => {
  const admin = await adminAuthService.loginAdmin(req.body);
  const token = jwtService.sign(admin._id, 'admin');

  return sendSuccess(res, {
    message: 'Admin logged in successfully',
    token,
    data: admin,
  });
};

const logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  await adminAuthService.logoutAdmin(token);

  return sendSuccess(res, {
    message: 'Admin logged out successfully',
  });
};

module.exports = {
  register,
  login,
  logout,
};
