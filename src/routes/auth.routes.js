const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
router.post('/register', asyncHandler(authController.register));

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 */
router.post('/login', asyncHandler(authController.login));

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/logout', authenticate, asyncHandler(authController.logout));

/**
 * @openapi
 * /auth/google:
 *   post:
 *     summary: Google OAuth login
 *     tags: [Auth]
 */
router.post('/google', asyncHandler(authController.googleLogin));

/**
 * @openapi
 * /auth/apple:
 *   post:
 *     summary: Apple OAuth login
 *     tags: [Auth]
 */
router.post('/apple', asyncHandler(authController.appleLogin));

/**
 * @openapi
 * /auth/kakao:
 *   post:
 *     summary: Kakao OAuth login
 *     tags: [Auth]
 */
router.post('/kakao', asyncHandler(authController.kakaoLogin));

/**
 * @openapi
 * /auth/naver:
 *   post:
 *     summary: Naver OAuth login
 *     tags: [Auth]
 */
router.post('/naver', asyncHandler(authController.naverLogin));

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Profile]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/me', authenticate, asyncHandler(authController.getMe));

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/profile', authenticate, asyncHandler(authController.getProfile));

/**
 * @openapi
 * /auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security: [{ bearerAuth: [] }]
 */
router.put('/profile', authenticate, asyncHandler(authController.updateProfile));

/**
 * @openapi
 * /auth/interests:
 *   put:
 *     summary: Update user interests
 *     tags: [Profile]
 *     security: [{ bearerAuth: [] }]
 */
router.put('/interests', authenticate, asyncHandler(authController.updateInterests));

module.exports = router;