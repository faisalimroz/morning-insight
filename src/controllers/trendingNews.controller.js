// const trendingNewsService = require('../services/news.service');
// const { sendSuccess } = require('../utils/response');
// const { listQuerySchema, validate } = require('../validators/contentItem.validator');

// // const getTrendingNews = async (req, res) => {
// //   const filters = validate(listQuerySchema, req.query);
// //   const result = await trendingNewsService.getTrendingNews(filters);
// //   return sendSuccess(res, {
// //     message: 'Trending news fetched successfully',
// //     data: result,
// //   });
// // };

// // const getTrendingNewsById = async (req, res) => {
// //   const item = await trendingNewsService.getTrendingNewsById(req.params.id, true);
// //   return sendSuccess(res, {
// //     message: 'Trending news fetched successfully',
// //     data: item,
// //   });
// // };


// const getTrendingNews = async (req, res) => {
//   const result = await trendingNewsService.find({ is_trending: true }).sort({ createdAt: -1 });
//   return sendSuccess(res, {
//     message: 'Trending news fetched successfully',
//     data: result,
//   });
// };

// const getTrendingNewsById = async (req, res) => {
//   const item = await trendingNewsService.findOne({ _id: req.params.id, is_trending: true });
//   return sendSuccess(res, {
//     message: 'Trending news fetched successfully',
//     data: item,
//   });
// };
// module.exports = {
//   getTrendingNews,
//   getTrendingNewsById,
// };


const News = require('../models/news.model');
const { sendSuccess } = require('../utils/response');

const getTrendingNews = async (req, res) => {
  const result = await News.find({ is_trending: true }).sort({ createdAt: -1 });
  return sendSuccess(res, {
    message: 'Trending news fetched successfully',
    data: result,
  });
};

const getTrendingNewsById = async (req, res) => {
  const item = await News.findOne({ _id: req.params.id, is_trending: true });
  return sendSuccess(res, {
    message: 'Trending news fetched successfully',
    data: item,
  });
};

module.exports = {
  getTrendingNews,
  getTrendingNewsById,
};