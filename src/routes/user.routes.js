const express = require('express');
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authenticate, asyncHandler(userController.getAllUsers));
router.post('/', asyncHandler(userController.createUser));
router.put('/:id', authenticate, asyncHandler(userController.updateUser));
router.delete('/:id', authenticate, asyncHandler(userController.deleteUser));

module.exports = router;
