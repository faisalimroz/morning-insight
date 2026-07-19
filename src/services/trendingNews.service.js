const TrendingNews = require('../models/trendingNews.model');
const { createContentService } = require('./contentItem.service');

const service = createContentService(TrendingNews, 'Trending news');

module.exports = {
  getTrendingNews: service.getAll,
  getTrendingNewsById: service.getById,
  createTrendingNews: service.create,
  updateTrendingNews: service.update,
  deleteTrendingNews: service.remove,
};
