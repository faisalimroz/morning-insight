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

// News Routes
router.get('/news', authenticate, asyncHandler(newsController.getNews));
router.get('/news/feed', authenticate, asyncHandler(newsController.getPersonalizedFeed));
router.get('/news/:id', authenticate, asyncHandler(newsController.getNewsById));

// Trending News Routes
router.get('/trending-news', authenticate, asyncHandler(trendingNewsController.getTrendingNews));
router.get('/trending-news/:id', authenticate, asyncHandler(trendingNewsController.getTrendingNewsById));

// Breaking News Routes
router.get('/breaking-news', authenticate, asyncHandler(breakingNewsController.getBreakingNews));
router.get('/breaking-news/:id', authenticate, asyncHandler(breakingNewsController.getBreakingNewsById));

// Tender Routes
router.get('/tenders', authenticate, asyncHandler(tenderController.getTenders));
router.get('/tenders/:id', authenticate, asyncHandler(tenderController.getTenderById));

// Currency Route
router.get('/currency/daily-rate', asyncHandler(currencyController.getDailyRate));

// Insight Routes (News collection)
router.get('/insight/categories/count', authenticate, asyncHandler(insightController.getInsightCategoryCounts));
router.get('/insight', authenticate, asyncHandler(insightController.getInsights));

// Bookmarks Routes
router.post('/bookmarks', authenticate, asyncHandler(bookmarkController.addBookmark));
router.delete('/bookmarks/:newsId', authenticate, asyncHandler(bookmarkController.removeBookmark));
router.get('/bookmarks', authenticate, asyncHandler(bookmarkController.getBookmarks));

// Daily Inspiration Route
router.get('/daily-inspiration', authenticate, asyncHandler(inspirationController.getDailyInspiration));

module.exports = router;
