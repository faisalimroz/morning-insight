const Tender = require('../models/tender.model');
const { createContentService } = require('./contentItem.service');

const service = createContentService(Tender, 'Tender');

module.exports = {
  getTenders: service.getAll,
  getTenderById: service.getById,
  createTender: service.create,
  updateTender: service.update,
  deleteTender: service.remove,
};
