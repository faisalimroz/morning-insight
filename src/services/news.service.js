const News = require('../models/news.model');
const AppError = require('../utils/AppError');
const {
  validateObjectId,
  parsePagination,
  buildTextSearch,
  buildDateFilter,
  buildPaginatedResult,
  mergeFilters,
  validateRequiredString,
} = require('../utils/queryHelpers');
const buildNewsQuery = (filters = {}) => {
  const { category, insightCategory, date, search } = filters;
  const query = {};

  if (category) {
    query.category = String(category).trim();
  }

  if (insightCategory) {
    // Better handling for insightCategory (supports spaces & special chars)
    query.insightCategory = String(insightCategory).trim();
  }

  if (date) {
    const dateFilter = buildDateFilter(date);
    if (dateFilter) Object.assign(query, dateFilter);
  }

  if (search) {
    const textSearch = buildTextSearch(search, ['title', 'content']);
    if (textSearch) Object.assign(query, textSearch);
  }

  return query;
};
// const buildNewsQuery = (filters = {}) => {
//   const { category, insightCategory, date, search } = filters;
//   const conditions = [];

//   if (category) {
//     conditions.push({ category: String(category).trim() });
//   }

//   if (insightCategory) {
//     conditions.push({ insightCategory: String(insightCategory).trim() });
//   }

//   if (date) {
//     conditions.push(buildDateFilter(date));
//   }

//   if (search) {
//     conditions.push(buildTextSearch(search, ['title', 'content']));
//   }

//   return mergeFilters(...conditions);
// };

const getNews = async (filters = {}) => {
  const query = buildNewsQuery(filters);
  const usePagination = filters.page !== undefined || filters.limit !== undefined;

  if (!usePagination) {
    return News.find(query).sort({ createdAt: -1 });
  }

  const { page, limit, skip } = parsePagination(filters.page, filters.limit);

  const [items, total] = await Promise.all([
    News.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    News.countDocuments(query),
  ]);

  return buildPaginatedResult(items, total, page, limit);
};

const getNewsById = async (id, incrementViews = false) => {
  validateObjectId(id, 'news ID');

  if (incrementViews) {
    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true },
    );
    if (!news) {
      throw new AppError('News article not found', 404);
    }
    return news;
  }

  const news = await News.findById(id);
  if (!news) {
    throw new AppError('News article not found', 404);
  }
  return news;
};

const getPersonalizedFeed = async (userId) => {
  const User = require('../models/user.model');

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const interests = user.interests || [];

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  return News.find({
    category: { $in: interests },
    createdAt: {
      $gte: startOfToday,
      $lt: startOfTomorrow,
    },
  }).sort({ createdAt: -1 });
};
// const getPersonalizedFeed = async (userId) => {
//   const User = require('../models/user.model');
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError('User not found', 404);
//   }

//   const interests = user.interests || [];
//   return News.find({ category: { $in: interests } }).sort({ createdAt: -1 });
// };

const validateNewsFields = (data, { requireAll = true } = {}) => {
  const title = data.title !== undefined ? validateRequiredString(data.title, 'Title') : undefined;
  const content =
    data.content !== undefined ? validateRequiredString(data.content, 'Content') : undefined;
  const category =
    data.category !== undefined ? validateRequiredString(data.category, 'Category') : undefined;
  const insightCategory =
    data.insightCategory !== undefined
      ? validateRequiredString(data.insightCategory, 'Insight category')
      : undefined;

  if (requireAll) {
    validateRequiredString(data.title, 'Title');
    validateRequiredString(data.content, 'Content');
    validateRequiredString(data.category, 'Category');
    validateRequiredString(data.insightCategory, 'Insight category');
  }

  return { title, content, category, insightCategory };
};

const createNews = async (newsData) => {
  validateNewsFields(newsData, { requireAll: true });

  const { title, content, category, insightCategory } = newsData;

  return News.create({
    title: String(title).trim(),
    content: String(content).trim(),
    category: String(category).trim(),
    insightCategory: String(insightCategory).trim(),
    image: newsData.image,
    author: newsData.author,
  });
};

const updateNews = async (id, newsData) => {
  validateObjectId(id, 'news ID');
  validateNewsFields(newsData, { requireAll: false });

  const updates = {};
  if (newsData.title !== undefined) updates.title = String(newsData.title).trim();
  if (newsData.content !== undefined) updates.content = String(newsData.content).trim();
  if (newsData.category !== undefined) updates.category = String(newsData.category).trim();
  if (newsData.insightCategory !== undefined) {
    updates.insightCategory = String(newsData.insightCategory).trim();
  }
  if (newsData.image !== undefined) updates.image = newsData.image;
  if (newsData.author !== undefined) updates.author = newsData.author;

  if (Object.keys(updates).length === 0) {
    throw new AppError('No valid fields to update', 400);
  }

  const news = await News.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!news) {
    throw new AppError('News article not found', 404);
  }

  return news;
};

const deleteNews = async (id) => {
  validateObjectId(id, 'news ID');

  const news = await News.findByIdAndDelete(id);
  if (!news) {
    throw new AppError('News article not found', 404);
  }

  return news;
};

module.exports = {
  buildNewsQuery,
  getNews,
  getNewsById,
  getPersonalizedFeed,
  createNews,
  updateNews,
  deleteNews,
};
