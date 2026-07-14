const News = require('../models/news.model');
const AppError = require('../utils/AppError');
const {
  validateObjectId,
  parsePagination,
  buildTextSearch,
  buildPaginatedResult,
  mergeFilters,
  validateRequiredString,
} = require('../utils/queryHelpers');
const {
  createNews,
  updateNews,
  deleteNews,
} = require('./news.service');

const buildInsightQuery = (filters = {}) => {
  const { insightCategory, search } = filters;
  const conditions = [];

  if (insightCategory) {
    conditions.push({ insightCategory: String(insightCategory).trim() });
  }

  if (search) {
    conditions.push(buildTextSearch(search, ['title', 'content']));
  }

  return mergeFilters(...conditions);
};

const getInsights = async (filters = {}) => {
  const { page, limit, skip } = parsePagination(filters.page, filters.limit);
  const query = buildInsightQuery(filters);

  const [items, total] = await Promise.all([
    News.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    News.countDocuments(query),
  ]);

  return buildPaginatedResult(items, total, page, limit);
};
const getInsightCategoryCounts = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return News.aggregate([
    {
      $match: {
        insightCategory: { $exists: true, $ne: '' },
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
    },
    {
      $group: {
        _id: '$insightCategory',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    {
      $project: {
        _id: 0,
        insightCategory: '$_id',
        count: 1,
      },
    },
  ]);
};
// const getInsightCategoryCounts = async () =>
//   News.aggregate([
//     { $match: { insightCategory: { $exists: true, $ne: '' } } },
//     { $group: { _id: '$insightCategory', count: { $sum: 1 } } },
//     { $sort: { count: -1 } },
//     {
//       $project: {
//         _id: 0,
//         insightCategory: '$_id',
//         count: 1,
//       },
//     },
//   ]);

const createInsight = async (data) => {
  validateRequiredString(data.insightCategory, 'Insight category');
  return createNews(data);
};

const getInsightById = async (id) => {
  validateObjectId(id, 'insight ID');
  const news = await News.findById(id);
  if (!news) {
    throw new AppError('Insight not found', 404);
  }
  return news;
};

const updateInsight = async (id, data) => {
  if (data.insightCategory !== undefined) {
    validateRequiredString(data.insightCategory, 'Insight category');
  }
  return updateNews(id, data);
};

const deleteInsight = async (id) => deleteNews(id);

module.exports = {
  getInsights,
  getInsightCategoryCounts,
  createInsight,
  getInsightById,
  updateInsight,
  deleteInsight,
};
