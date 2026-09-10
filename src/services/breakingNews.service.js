const BreakingNews = require('../models/news.model');
const { createContentService } = require('./contentItem.service');

const service = createContentService(BreakingNews, 'Breaking news');

module.exports = {
  getBreakingNews: service.getAll,
  getBreakingNewsById: service.getById,
  createBreakingNews: service.create,
  updateBreakingNews: service.update,
  deleteBreakingNews: service.remove,
};
