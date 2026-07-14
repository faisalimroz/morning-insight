const insightService = require('../services/insight.service');
const { sendSuccess } = require('../utils/response');

const getInsights = async (req, res) => {
  const { insightCategory, page, limit, search } = req.query;
  const result = await insightService.getInsights({
    insightCategory,
    page,
    limit,
    search,
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

module.exports = {
  getInsights,
  getInsightCategoryCounts,
};
