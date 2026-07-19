const express = require('express');
const adminController = require('../controllers/admin.controller');
const adminAuthenticate = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

/**
 * @openapi
 * /api/admin/news:
 *   post:
 *     summary: Create news
 *     tags: [Admin - News]
 *     security: [{ bearerAuth: [] }]
 *   get:
 *     summary: Get all news
 *     tags: [Admin - News]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/news', adminAuthenticate, asyncHandler(adminController.createNews));
router.get('/news', adminAuthenticate, asyncHandler(adminController.getNews));

/**
 * @openapi
 * /api/admin/news/{id}:
 *   get:
 *     summary: Get news by ID
 *     tags: [Admin - News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *   put:
 *     summary: Update news
 *     tags: [Admin - News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *   delete:
 *     summary: Delete news
 *     tags: [Admin - News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 */
router.get('/news/:id', adminAuthenticate, asyncHandler(adminController.getNewsById));
router.put('/news/:id', adminAuthenticate, asyncHandler(adminController.updateNews));
router.delete('/news/:id', adminAuthenticate, asyncHandler(adminController.deleteNews));

/**
 * @openapi
 * /api/admin/trending-news:
 *   post:
 *     summary: Create trending news
 *     tags: [Admin - Trending News]
 *     security: [{ bearerAuth: [] }]
 *   get:
 *     summary: Get trending news
 *     tags: [Admin - Trending News]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/trending-news', adminAuthenticate, asyncHandler(adminController.createTrendingNews));
router.get('/trending-news', adminAuthenticate, asyncHandler(adminController.getTrendingNews));

/**
 * @openapi
 * /api/admin/trending-news/{id}:
 *   get:
 *     summary: Get trending news by ID
 *     tags: [Admin - Trending News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   put:
 *     summary: Update trending news
 *     tags: [Admin - Trending News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   delete:
 *     summary: Delete trending news
 *     tags: [Admin - Trending News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 */
router.get('/trending-news/:id', adminAuthenticate, asyncHandler(adminController.getTrendingNewsById));
router.put('/trending-news/:id', adminAuthenticate, asyncHandler(adminController.updateTrendingNews));
router.delete('/trending-news/:id', adminAuthenticate, asyncHandler(adminController.deleteTrendingNews));

/**
 * @openapi
 * /api/admin/breaking-news:
 *   post:
 *     summary: Create breaking news
 *     tags: [Admin - Breaking News]
 *     security: [{ bearerAuth: [] }]
 *   get:
 *     summary: Get breaking news
 *     tags: [Admin - Breaking News]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/breaking-news', adminAuthenticate, asyncHandler(adminController.createBreakingNews));
router.get('/breaking-news', adminAuthenticate, asyncHandler(adminController.getBreakingNews));

/**
 * @openapi
 * /api/admin/breaking-news/{id}:
 *   get:
 *     summary: Get breaking news by ID
 *     tags: [Admin - Breaking News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   put:
 *     summary: Update breaking news
 *     tags: [Admin - Breaking News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   delete:
 *     summary: Delete breaking news
 *     tags: [Admin - Breaking News]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 */
router.get('/breaking-news/:id', adminAuthenticate, asyncHandler(adminController.getBreakingNewsById));
router.put('/breaking-news/:id', adminAuthenticate, asyncHandler(adminController.updateBreakingNews));
router.delete('/breaking-news/:id', adminAuthenticate, asyncHandler(adminController.deleteBreakingNews));

/**
 * @openapi
 * /api/admin/tenders:
 *   post:
 *     summary: Create tender
 *     tags: [Admin - Tenders]
 *     security: [{ bearerAuth: [] }]
 *   get:
 *     summary: Get tenders
 *     tags: [Admin - Tenders]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/tenders', adminAuthenticate, asyncHandler(adminController.createTender));
router.get('/tenders', adminAuthenticate, asyncHandler(adminController.getTenders));

/**
 * @openapi
 * /api/admin/tenders/{id}:
 *   get:
 *     summary: Get tender by ID
 *     tags: [Admin - Tenders]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   put:
 *     summary: Update tender
 *     tags: [Admin - Tenders]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   delete:
 *     summary: Delete tender
 *     tags: [Admin - Tenders]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 */
router.get('/tenders/:id', adminAuthenticate, asyncHandler(adminController.getTenderById));
router.put('/tenders/:id', adminAuthenticate, asyncHandler(adminController.updateTender));
router.delete('/tenders/:id', adminAuthenticate, asyncHandler(adminController.deleteTender));

/**
 * @openapi
 * /api/admin/insight:
 *   post:
 *     summary: Create insight
 *     tags: [Admin - Insight]
 *     security: [{ bearerAuth: [] }]
 *   get:
 *     summary: Get insights
 *     tags: [Admin - Insight]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/insight', adminAuthenticate, asyncHandler(adminController.createInsight));
router.get('/insight', adminAuthenticate, asyncHandler(adminController.getInsights));

/**
 * @openapi
 * /api/admin/insight/categories/count:
 *   get:
 *     summary: Get insight category counts
 *     tags: [Admin - Insight]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/insight/categories/count', adminAuthenticate, asyncHandler(adminController.getInsightCategoryCounts));

/**
 * @openapi
 * /api/admin/insight/{id}:
 *   get:
 *     summary: Get insight by ID
 *     tags: [Admin - Insight]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   put:
 *     summary: Update insight
 *     tags: [Admin - Insight]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   delete:
 *     summary: Delete insight
 *     tags: [Admin - Insight]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 */
router.get('/insight/:id', adminAuthenticate, asyncHandler(adminController.getInsightById));
router.put('/insight/:id', adminAuthenticate, asyncHandler(adminController.updateInsight));
router.delete('/insight/:id', adminAuthenticate, asyncHandler(adminController.deleteInsight));

/**
 * @openapi
 * /api/admin/bookmarks:
 *   post:
 *     summary: Create bookmark
 *     tags: [Admin - Bookmarks]
 *     security: [{ bearerAuth: [] }]
 *   get:
 *     summary: Get all bookmarks
 *     tags: [Admin - Bookmarks]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/bookmarks', adminAuthenticate, asyncHandler(adminController.createBookmark));
router.get('/bookmarks', adminAuthenticate, asyncHandler(adminController.getBookmarks));

/**
 * @openapi
 * /api/admin/bookmarks/{id}:
 *   get:
 *     summary: Get bookmark by ID
 *     tags: [Admin - Bookmarks]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   put:
 *     summary: Update bookmark
 *     tags: [Admin - Bookmarks]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   delete:
 *     summary: Delete bookmark
 *     tags: [Admin - Bookmarks]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 */
router.get('/bookmarks/:id', adminAuthenticate, asyncHandler(adminController.getBookmarkById));
router.put('/bookmarks/:id', adminAuthenticate, asyncHandler(adminController.updateBookmark));
router.delete('/bookmarks/:id', adminAuthenticate, asyncHandler(adminController.deleteBookmark));

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/users', adminAuthenticate, asyncHandler(adminController.getUsers));

/**
 * @openapi
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   put:
 *     summary: Update user
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 *   delete:
 *     summary: Delete user
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true }]
 */
router.get('/users/:id', adminAuthenticate, asyncHandler(adminController.getUserById));
router.put('/users/:id', adminAuthenticate, asyncHandler(adminController.updateUser));
router.delete('/users/:id', adminAuthenticate, asyncHandler(adminController.deleteUser));

module.exports = router;
