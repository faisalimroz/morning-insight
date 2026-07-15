const express = require('express');
const adminAuthController = require('../controllers/admin.auth.controller');
const adminAuthenticate = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', asyncHandler(adminAuthController.register));
router.post('/login', asyncHandler(adminAuthController.login));
router.post('/logout', adminAuthenticate, asyncHandler(adminAuthController.logout));

module.exports = router;
