// const breakingNewsService = require('../services/breakingNews.service');
// const { sendSuccess } = require('../utils/response');
// const { listQuerySchema, validate } = require('../validators/contentItem.validator');

// const getBreakingNews = async (req, res) => {
//   const filters = validate(listQuerySchema, req.query);
//   const result = await breakingNewsService.getBreakingNews(filters);
//   return sendSuccess(res, {
//     message: 'Breaking news fetched successfully',
//     data: result,
//   });
// };

// const getBreakingNewsById = async (req, res) => {
//   const item = await breakingNewsService.getBreakingNewsById(req.params.id, true);
//   return sendSuccess(res, {
//     message: 'Breaking news fetched successfully',
//     data: item,
//   });
// };

// module.exports = {
//   getBreakingNews,
//   getBreakingNewsById,
// };


const News = require('../models/news.model');
const { sendSuccess } = require('../utils/response');

const getBreakingNews = async (req, res) => {
  const result = await News.find({ is_breaking: true }).sort({ createdAt: -1 });
  return sendSuccess(res, {
    message: 'Breaking news fetched successfully',
    data: result,
  });
};

const getBreakingNewsById = async (req, res) => {
  const item = await News.findOne({ _id: req.params.id, is_breaking: true });
  return sendSuccess(res, {
    message: 'Breaking news fetched successfully',
    data: item,
  });
};

module.exports = {
  getBreakingNews,
  getBreakingNewsById,
};