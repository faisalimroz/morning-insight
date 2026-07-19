const express = require('express');
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 */
router.get('/', authenticate, asyncHandler(userController.getAllUsers));
router.post('/', asyncHandler(userController.createUser));

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.put('/:id', authenticate, asyncHandler(userController.updateUser));
router.delete('/:id', authenticate, asyncHandler(userController.deleteUser));
module.exports = router;
