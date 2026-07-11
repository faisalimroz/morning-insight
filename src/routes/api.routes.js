const express = require('express');
const authController = require('../controllers/auth.controller');
const newsController = require('../controllers/news.controller');
const bookmarkController = require('../controllers/bookmark.controller');
const inspirationController = require('../controllers/inspiration.controller');
const authenticate = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Auth & Profile Routes
router.post('/auth/register', asyncHandler(authController.register));
router.get('/profile', authenticate, asyncHandler(authController.getProfile));
router.put('/profile', authenticate, asyncHandler(authController.updateProfile));
router.post('/profile/interests', authenticate, asyncHandler(authController.updateInterests));

// News Routes
router.get('/news', asyncHandler(newsController.getNews));
router.get('/news/feed', authenticate, asyncHandler(newsController.getPersonalizedFeed));
router.post('/news', authenticate, asyncHandler(newsController.createNews));

// Bookmarks Routes
router.post('/bookmarks', authenticate, asyncHandler(bookmarkController.addBookmark));
router.delete('/bookmarks/:newsId', authenticate, asyncHandler(bookmarkController.removeBookmark));
router.get('/bookmarks', authenticate, asyncHandler(bookmarkController.getBookmarks));

// Daily Inspiration Route
router.get('/daily-inspiration', authenticate, asyncHandler(inspirationController.getDailyInspiration));

module.exports = router;
