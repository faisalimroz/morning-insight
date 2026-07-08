const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/google', asyncHandler(authController.googleLogin));
router.post('/apple', asyncHandler(authController.appleLogin));
router.post('/kakao', asyncHandler(authController.kakaoLogin));
router.post('/naver', asyncHandler(authController.naverLogin));
router.get('/me', authenticate, asyncHandler(authController.getMe));

module.exports = router;
