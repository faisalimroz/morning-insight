// const tenderService = require('../services/tender.service');
// const { sendSuccess } = require('../utils/response');
// const { listQuerySchema, validate } = require('../validators/contentItem.validator');

// const getTenders = async (req, res) => {
//   const filters = validate(listQuerySchema, req.query);
//   const result = await tenderService.getTenders(filters);
//   return sendSuccess(res, {
//     message: 'Tenders fetched successfully',
//     data: result,
//   });
// };

// const getTenderById = async (req, res) => {
//   const item = await tenderService.getTenderById(req.params.id, true);
//   return sendSuccess(res, {
//     message: 'Tender fetched successfully',
//     data: item,
//   });
// };

// module.exports = {
//   getTenders,
//   getTenderById,
// };


const Tender = require('../models/news.model'); 
const { sendSuccess } = require('../utils/response');

const getTenders = async (req, res) => {
  const result = await Tender.find({ is_tender: true }).sort({ createdAt: -1 });
  return sendSuccess(res, {
    message: 'Tenders fetched successfully',
    data: result,
  });
};

const getTenderById = async (req, res) => {
  const item = await Tender.findOne({ _id: req.params.id, is_tender: true });
  return sendSuccess(res, {
    message: 'Tender fetched successfully',
    data: item,
  });
};

module.exports = {
  getTenders,
  getTenderById,
};