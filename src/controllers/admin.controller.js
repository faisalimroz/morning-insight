const adminAuthService = require('../services/admin.auth.service');
const newsService = require('../services/news.service');
const insightService = require('../services/insight.service');
const adminBookmarkService = require('../services/admin.bookmark.service');
const adminUserService = require('../services/admin.user.service');
const jwtService = require('../services/jwt.service');
const { sendSuccess } = require('../utils/response');

const register = async (req, res) => {
  const user = await adminAuthService.registerAdmin(req.body);
  const token = jwtService.sign(user._id);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Admin registered successfully',
    token,
    data: user,
  });
};

const login = async (req, res) => {
  const user = await adminAuthService.loginAdmin(req.body);
  const token = jwtService.sign(user._id);

  return sendSuccess(res, {
    message: 'Admin logged in successfully',
    token,
    data: user,
  });
};

const createNews = async (req, res) => {
  const news = await newsService.createNews(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'News created successfully',
    data: news,
  });
};

const getNews = async (req, res) => {
  const { search, category, insightCategory, date, page, limit } = req.query;
  const result = await newsService.getNews({
    search,
    category,
    insightCategory,
    date,
    page,
    limit,
  });
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
  register,
  login,
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
  createInsight,
  getInsights,
  getInsightById,
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
