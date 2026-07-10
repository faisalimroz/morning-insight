const authService = require('../services/auth.service');
const googleService = require('../services/google.service');
const appleService = require('../services/apple.service');
const kakaoService = require('../services/kakao.service');
const naverService = require('../services/naver.service');
const jwtService = require('../services/jwt.service');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');

const loginSuccess = (res, user) => {
  const token = jwtService.sign(user._id);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Logged in successfully',
    token,
    data: user,
  });
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new AppError('Token required', 400);
  }

  const profile = await googleService.verifyToken(token);
  const user = await authService.findOrCreateUser('google', profile);

  return loginSuccess(res, user);
};

const appleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new AppError('Token required', 400);
  }

  const profile = await appleService.verifyToken(token);
  const user = await authService.findOrCreateUser('apple', profile, {
    updateOnExisting: ['email'],
  });

  return loginSuccess(res, user);
};

const kakaoLogin = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    throw new AppError('Access token required', 400);
  }

  const profile = await kakaoService.verifyAccessToken(access_token);
  const user = await authService.findOrCreateUser('kakao', profile);

  return loginSuccess(res, user);
};

const naverLogin = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    throw new AppError('Access token required', 400);
  }

  const profile = await naverService.verifyAccessToken(access_token);
  const user = await authService.findOrCreateUser('naver', profile);

  return loginSuccess(res, user);
};

const getMe = async (req, res) =>
  sendSuccess(res, {
    message: 'User fetched successfully',
    data: req.user,
  });

const register = async (req, res) => {
  const user = await authService.registerUser(req.body);
  const token = jwtService.sign(user._id);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Registered successfully',
    token,
    data: user,
  });
};

const getProfile = async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  return sendSuccess(res, {
    message: 'Profile fetched successfully',
    data: user,
  });
};

const updateProfile = async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  return sendSuccess(res, {
    message: 'Profile updated successfully',
    data: user,
  });
};

const updateInterests = async (req, res) => {
  const { interests } = req.body;
  if (!interests) {
    throw new AppError('Interests array is required', 400);
  }
  const user = await authService.updateInterests(req.user.id, interests);
  return sendSuccess(res, {
    message: 'Interests updated successfully',
    data: user,
  });
};

module.exports = {
  googleLogin,
  appleLogin,
  kakaoLogin,
  naverLogin,
  getMe,
  register,
  getProfile,
  updateProfile,
  updateInterests,
};
