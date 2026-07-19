const tenderService = require('../services/tender.service');
const { sendSuccess } = require('../utils/response');
const { listQuerySchema, validate } = require('../validators/contentItem.validator');

const getTenders = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await tenderService.getTenders(filters);
  return sendSuccess(res, {
    message: 'Tenders fetched successfully',
    data: result,
  });
};

const getTenderById = async (req, res) => {
  const item = await tenderService.getTenderById(req.params.id, true);
  return sendSuccess(res, {
    message: 'Tender fetched successfully',
    data: item,
  });
};

module.exports = {
  getTenders,
  getTenderById,
};
