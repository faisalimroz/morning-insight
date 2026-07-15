const express = require('express');
const adminController = require('../controllers/admin.controller');
const adminAuthenticate = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Admin news CRUD
router.post('/news', adminAuthenticate, asyncHandler(adminController.createNews));
router.get('/news', adminAuthenticate, asyncHandler(adminController.getNews));
router.get('/news/:id', adminAuthenticate, asyncHandler(adminController.getNewsById));
router.put('/news/:id', adminAuthenticate, asyncHandler(adminController.updateNews));
router.delete('/news/:id', adminAuthenticate, asyncHandler(adminController.deleteNews));

// Admin insight CRUD (News collection)
router.post('/insight', adminAuthenticate, asyncHandler(adminController.createInsight));
router.get('/insight', adminAuthenticate, asyncHandler(adminController.getInsights));
router.get('/insight/:id', adminAuthenticate, asyncHandler(adminController.getInsightById));
router.put('/insight/:id', adminAuthenticate, asyncHandler(adminController.updateInsight));
router.delete('/insight/:id', adminAuthenticate, asyncHandler(adminController.deleteInsight));
router.get('/insight/categories/count', adminAuthenticate, asyncHandler(adminController.getInsightCategoryCounts));

// Admin bookmark CRUD
router.post('/bookmarks', adminAuthenticate, asyncHandler(adminController.createBookmark));
router.get('/bookmarks', adminAuthenticate, asyncHandler(adminController.getBookmarks));
router.get('/bookmarks/:id', adminAuthenticate, asyncHandler(adminController.getBookmarkById));
router.put('/bookmarks/:id', adminAuthenticate, asyncHandler(adminController.updateBookmark));
router.delete('/bookmarks/:id', adminAuthenticate, asyncHandler(adminController.deleteBookmark));

// Admin user management
router.get('/users', adminAuthenticate, asyncHandler(adminController.getUsers));
router.get('/users/:id', adminAuthenticate, asyncHandler(adminController.getUserById));
router.put('/users/:id', adminAuthenticate, asyncHandler(adminController.updateUser));
router.delete('/users/:id', adminAuthenticate, asyncHandler(adminController.deleteUser));

module.exports = router;
