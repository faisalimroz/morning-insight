const Bookmark = require('../models/bookmark.model');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');
const {
  validateObjectId,
  parsePagination,
  buildTextSearch,
  buildPaginatedResult,
  mergeFilters,
} = require('../utils/queryHelpers');

const buildBookmarkQuery = async (filters = {}) => {
  const { search, user: userFilter } = filters;
  const conditions = [];

  if (userFilter) {
    validateObjectId(userFilter, 'user ID');
    conditions.push({ userId: userFilter });
  }

  if (search) {
    const newsSearch = buildTextSearch(search, ['title', 'content']);
    const News = require('../models/news.model');
    const matchingNews = await News.find(newsSearch).select('_id');
    const newsIds = matchingNews.map((n) => n._id);

    const userSearch = buildTextSearch(search, ['name', 'email', 'origin']);
    const matchingUsers = await User.find(userSearch).select('_id');
    const userIds = matchingUsers.map((u) => u._id);

    conditions.push({
      $or: [{ newsId: { $in: newsIds } }, { userId: { $in: userIds } }],
    });
  }

  return mergeFilters(...conditions);
};

const getBookmarks = async (filters = {}) => {
  const { page, limit, skip } = parsePagination(filters.page, filters.limit);
  const query = await buildBookmarkQuery(filters);

  const [items, total] = await Promise.all([
    Bookmark.find(query)
      .populate('userId', 'name email origin role')
      .populate('newsId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Bookmark.countDocuments(query),
  ]);

  return buildPaginatedResult(items, total, page, limit);
};

const getBookmarkById = async (id) => {
  validateObjectId(id, 'bookmark ID');

  const bookmark = await Bookmark.findById(id)
    .populate('userId', 'name email origin role')
    .populate('newsId');

  if (!bookmark) {
    throw new AppError('Bookmark not found', 404);
  }

  return bookmark;
};

const createBookmark = async (payload) => {
  const { userId, newsId } = payload;

  if (!userId || !newsId) {
    throw new AppError('User ID and news ID are required', 400);
  }

  validateObjectId(userId, 'user ID');
  validateObjectId(newsId, 'news ID');

  const userExists = await User.findById(userId);
  if (!userExists) {
    throw new AppError('User not found', 404);
  }

  const News = require('../models/news.model');
  const newsExists = await News.findById(newsId);
  if (!newsExists) {
    throw new AppError('News article not found', 404);
  }

  try {
    return await Bookmark.create({ userId, newsId });
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError('Bookmark already exists', 409);
    }
    throw err;
  }
};

const updateBookmark = async (id, payload) => {
  validateObjectId(id, 'bookmark ID');

  const updates = {};
  if (payload.userId !== undefined) {
    validateObjectId(payload.userId, 'user ID');
    const userExists = await User.findById(payload.userId);
    if (!userExists) {
      throw new AppError('User not found', 404);
    }
    updates.userId = payload.userId;
  }

  if (payload.newsId !== undefined) {
    validateObjectId(payload.newsId, 'news ID');
    const News = require('../models/news.model');
    const newsExists = await News.findById(payload.newsId);
    if (!newsExists) {
      throw new AppError('News article not found', 404);
    }
    updates.newsId = payload.newsId;
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError('No valid fields to update', 400);
  }

  try {
    const bookmark = await Bookmark.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate('userId', 'name email origin role')
      .populate('newsId');

    if (!bookmark) {
      throw new AppError('Bookmark not found', 404);
    }

    return bookmark;
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError('Bookmark already exists', 409);
    }
    throw err;
  }
};

const deleteBookmark = async (id) => {
  validateObjectId(id, 'bookmark ID');

  const bookmark = await Bookmark.findByIdAndDelete(id);
  if (!bookmark) {
    throw new AppError('Bookmark not found', 404);
  }

  return bookmark;
};

module.exports = {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
