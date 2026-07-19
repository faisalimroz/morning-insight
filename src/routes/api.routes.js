const express = require('express');
const newsController = require('../controllers/news.controller');
const trendingNewsController = require('../controllers/trendingNews.controller');
const breakingNewsController = require('../controllers/breakingNews.controller');
const tenderController = require('../controllers/tender.controller');
const currencyController = require('../controllers/currency.controller');
const bookmarkController = require('../controllers/bookmark.controller');
const inspirationController = require('../controllers/inspiration.controller');
const insightController = require('../controllers/insight.controller');
const authenticate = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Get all news
 *     tags: [News]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: "Success" }
 */
router.get('/news', authenticate, asyncHandler(newsController.getNews));

/**
 * @openapi
 * /api/news/feed:
 *   get:
 *     summary: Get personalized news feed
 *     tags: [News]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/news/feed', authenticate, asyncHandler(newsController.getPersonalizedFeed));

/**
 * @openapi
 * /api/news/{id}:
 *   get:
 *     summary: Get news by ID
 *     tags: [News]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.get('/news/:id', authenticate, asyncHandler(newsController.getNewsById));

/**
 * @openapi
 * /api/trending-news:
 *   get:
 *     summary: Get trending news
 *     tags: [Trending News]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/trending-news', authenticate, asyncHandler(trendingNewsController.getTrendingNews));

/**
 * @openapi
 * /api/trending-news/{id}:
 *   get:
 *     summary: Get trending news by ID
 *     tags: [Trending News]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get('/trending-news/:id', authenticate, asyncHandler(trendingNewsController.getTrendingNewsById));

/**
 * @openapi
 * /api/tenders:
 *   get:
 *     summary: Get all tenders
 *     tags: [Tenders]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/tenders', authenticate, asyncHandler(tenderController.getTenders));

/**
 * @openapi
 * /api/tenders/{id}:
 *   get:
 *     summary: Get tender by ID
 *     tags: [Tenders]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get('/tenders/:id', authenticate, asyncHandler(tenderController.getTenderById));

/**
 * @openapi
 * /api/currency/daily-rate:
 *   get:
 *     summary: Get daily currency rates
 *     tags: [Currency]
 */
router.get('/currency/daily-rate', asyncHandler(currencyController.getDailyRate));

/**
 * @openapi
 * /api/bookmarks:
 *   get:
 *     summary: Get all bookmarks
 *     tags: [Bookmarks]
 *     security: [{ bearerAuth: [] }]
 *   post:
 *     summary: Add a bookmark
 *     tags: [Bookmarks]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/bookmarks', authenticate, asyncHandler(bookmarkController.getBookmarks));
router.post('/bookmarks', authenticate, asyncHandler(bookmarkController.addBookmark));

/**
 * @openapi
 * /api/bookmarks/{newsId}:
 *   delete:
 *     summary: Remove a bookmark
 *     tags: [Bookmarks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 */
router.delete('/bookmarks/:newsId', authenticate, asyncHandler(bookmarkController.removeBookmark));

/**
 * @openapi
 * /api/insight:
 *   get:
 *     summary: Get all insights
 *     tags: [Insight]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/insight', authenticate, asyncHandler(insightController.getInsights));

/**
 * @openapi
 * /api/insight/categories/count:
 *   get:
 *     summary: Get count of insights by category
 *     tags: [Insight]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/insight/categories/count', authenticate, asyncHandler(insightController.getInsightCategoryCounts));

/**
 * @openapi
 * /api/daily-inspiration:
 *   get:
 *     summary: Get daily inspiration quote
 *     tags: [Inspiration]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/daily-inspiration', authenticate, asyncHandler(inspirationController.getDailyInspiration));
/**
 * @openapi
 * /api/breaking-news:
 *   get:
 *     summary: Get all breaking news
 *     tags: [Breaking News]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/breaking-news', authenticate, asyncHandler(breakingNewsController.getBreakingNews));

/**
 * @openapi
 * /api/breaking-news/{id}:
 *   get:
 *     summary: Get breaking news by ID
 *     tags: [Breaking News]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.get('/breaking-news/:id', authenticate, asyncHandler(breakingNewsController.getBreakingNewsById));
module.exports = router;
