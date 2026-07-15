const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// User auth
router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));
router.post('/logout', authenticate, asyncHandler(authController.logout));

// OAuth
router.post('/google', asyncHandler(authController.googleLogin));
router.post('/apple', asyncHandler(authController.appleLogin));
router.post('/kakao', asyncHandler(authController.kakaoLogin));
router.post('/naver', asyncHandler(authController.naverLogin));

// Profile & interests
router.get('/me', authenticate, asyncHandler(authController.getMe));
router.get('/profile', authenticate, asyncHandler(authController.getProfile));
router.put('/profile', authenticate, asyncHandler(authController.updateProfile));
router.put('/interests', authenticate, asyncHandler(authController.updateInterests));

module.exports = router;
