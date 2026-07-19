const newsService = require('../services/news.service');
const insightService = require('../services/insight.service');
const trendingNewsService = require('../services/trendingNews.service');
const breakingNewsService = require('../services/breakingNews.service');
const tenderService = require('../services/tender.service');
const adminBookmarkService = require('../services/admin.bookmark.service');
const adminUserService = require('../services/admin.user.service');
const { sendSuccess } = require('../utils/response');
const { listQuerySchema, validate } = require('../validators/contentItem.validator');

const createNews = async (req, res) => {
  const news = await newsService.createNews(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'News created successfully',
    data: news,
  });
};

const getNews = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await newsService.getNews(filters);
  return sendSuccess(res, {
    message: 'News fetched successfully',
    data: result,
  });
};

const getNewsById = async (req, res) => {
  const news = await newsService.getNewsById(req.params.id);
  return sendSuccess(res, {
    message: 'News fetched successfully',
    data: news,
  });
};

const updateNews = async (req, res) => {
  const news = await newsService.updateNews(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'News updated successfully',
    data: news,
  });
};

const deleteNews = async (req, res) => {
  await newsService.deleteNews(req.params.id);
  return sendSuccess(res, {
    message: 'News deleted successfully',
  });
};

// Trending News CRUD
const createTrendingNews = async (req, res) => {
  const item = await trendingNewsService.createTrendingNews(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Trending news created successfully',
    data: item,
  });
};

const getTrendingNews = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await trendingNewsService.getTrendingNews(filters);
  return sendSuccess(res, {
    message: 'Trending news fetched successfully',
    data: result,
  });
};

const getTrendingNewsById = async (req, res) => {
  const item = await trendingNewsService.getTrendingNewsById(req.params.id);
  return sendSuccess(res, {
    message: 'Trending news fetched successfully',
    data: item,
  });
};

const updateTrendingNews = async (req, res) => {
  const item = await trendingNewsService.updateTrendingNews(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Trending news updated successfully',
    data: item,
  });
};

const deleteTrendingNews = async (req, res) => {
  await trendingNewsService.deleteTrendingNews(req.params.id);
  return sendSuccess(res, {
    message: 'Trending news deleted successfully',
  });
};

// Breaking News CRUD
const createBreakingNews = async (req, res) => {
  const item = await breakingNewsService.createBreakingNews(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Breaking news created successfully',
    data: item,
  });
};

const getBreakingNews = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await breakingNewsService.getBreakingNews(filters);
  return sendSuccess(res, {
    message: 'Breaking news fetched successfully',
    data: result,
  });
};

const getBreakingNewsById = async (req, res) => {
  const item = await breakingNewsService.getBreakingNewsById(req.params.id);
  return sendSuccess(res, {
    message: 'Breaking news fetched successfully',
    data: item,
  });
};

const updateBreakingNews = async (req, res) => {
  const item = await breakingNewsService.updateBreakingNews(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Breaking news updated successfully',
    data: item,
  });
};

const deleteBreakingNews = async (req, res) => {
  await breakingNewsService.deleteBreakingNews(req.params.id);
  return sendSuccess(res, {
    message: 'Breaking news deleted successfully',
  });
};

// Tender CRUD
const createTender = async (req, res) => {
  const item = await tenderService.createTender(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Tender created successfully',
    data: item,
  });
};

const getTenders = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await tenderService.getTenders(filters);
  return sendSuccess(res, {
    message: 'Tenders fetched successfully',
    data: result,
  });
};

const getTenderById = async (req, res) => {
  const item = await tenderService.getTenderById(req.params.id);
  return sendSuccess(res, {
    message: 'Tender fetched successfully',
    data: item,
  });
};

const updateTender = async (req, res) => {
  const item = await tenderService.updateTender(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Tender updated successfully',
    data: item,
  });
};

const deleteTender = async (req, res) => {
  await tenderService.deleteTender(req.params.id);
  return sendSuccess(res, {
    message: 'Tender deleted successfully',
  });
};

const createInsight = async (req, res) => {
  const insight = await insightService.createInsight(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Insight created successfully',
    data: insight,
  });
};

const getInsights = async (req, res) => {
  const { search, insightCategory, page, limit } = req.query;
  const result = await insightService.getInsights({
    search,
    insightCategory,
    page,
    limit,
  });
  return sendSuccess(res, {
    message: 'Insights fetched successfully',
    data: result,
  });
};

const getInsightCategoryCounts = async (req, res) => {
  const counts = await insightService.getInsightCategoryCounts();
  return sendSuccess(res, {
    message: 'Insight category counts fetched successfully',
    data: counts,
  });
};

const getInsightById = async (req, res) => {
  const insight = await insightService.getInsightById(req.params.id);
  return sendSuccess(res, {
    message: 'Insight fetched successfully',
    data: insight,
  });
};

const updateInsight = async (req, res) => {
  const insight = await insightService.updateInsight(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Insight updated successfully',
    data: insight,
  });
};

const deleteInsight = async (req, res) => {
  await insightService.deleteInsight(req.params.id);
  return sendSuccess(res, {
    message: 'Insight deleted successfully',
  });
};

const createBookmark = async (req, res) => {
  const bookmark = await adminBookmarkService.createBookmark(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Bookmark created successfully',
    data: bookmark,
  });
};

const getBookmarks = async (req, res) => {
  const { search, user, page, limit } = req.query;
  const result = await adminBookmarkService.getBookmarks({
    search,
    user,
    page,
    limit,
  });
  return sendSuccess(res, {
    message: 'Bookmarks fetched successfully',
    data: result,
  });
};

const getBookmarkById = async (req, res) => {
  const bookmark = await adminBookmarkService.getBookmarkById(req.params.id);
  return sendSuccess(res, {
    message: 'Bookmark fetched successfully',
    data: bookmark,
  });
};

const updateBookmark = async (req, res) => {
  const bookmark = await adminBookmarkService.updateBookmark(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Bookmark updated successfully',
    data: bookmark,
  });
};

const deleteBookmark = async (req, res) => {
  await adminBookmarkService.deleteBookmark(req.params.id);
  return sendSuccess(res, {
    message: 'Bookmark deleted successfully',
  });
};

const getUsers = async (req, res) => {
  const { search, role, origin, page, limit } = req.query;
  const result = await adminUserService.getUsers({
    search,
    role,
    origin,
    page,
    limit,
  });
  return sendSuccess(res, {
    message: 'Users fetched successfully',
    data: result,
  });
};

const getUserById = async (req, res) => {
  const user = await adminUserService.getUserById(req.params.id);
  return sendSuccess(res, {
    message: 'User fetched successfully',
    data: user,
  });
};

const updateUser = async (req, res) => {
  const user = await adminUserService.updateUser(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'User updated successfully',
    data: user,
  });
};

const deleteUser = async (req, res) => {
  await adminUserService.deleteUser(req.params.id);
  return sendSuccess(res, {
    message: 'User deleted successfully',
  });
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
  createTrendingNews,
  getTrendingNews,
  getTrendingNewsById,
  updateTrendingNews,
  deleteTrendingNews,
  createBreakingNews,
  getBreakingNews,
  getBreakingNewsById,
  updateBreakingNews,
  deleteBreakingNews,
  createTender,
  getTenders,
  getTenderById,
  updateTender,
  deleteTender,
  createInsight,
  getInsights,
  getInsightById,
  getInsightCategoryCounts,
  updateInsight,
  deleteInsight,
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
