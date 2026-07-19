const express = require('express');
const adminAuthController = require('../controllers/admin.auth.controller');
const adminAuthenticate = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

/**
 * @openapi
 * /api/admin/auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin - Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 */
router.post('/register', asyncHandler(adminAuthController.register));

/**
 * @openapi
 * /api/admin/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin - Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 */
router.post('/login', asyncHandler(adminAuthController.login));

/**
 * @openapi
 * /api/admin/auth/logout:
 *   post:
 *     summary: Logout admin
 *     tags: [Admin - Auth]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/logout', adminAuthenticate, asyncHandler(adminAuthController.logout));

module.exports = router;
