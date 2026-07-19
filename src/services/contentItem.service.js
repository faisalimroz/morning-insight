const AppError = require('../utils/AppError');
const {
  validateObjectId,
  parsePagination,
  buildContentQuery,
  buildPaginatedResult,
} = require('../utils/queryHelpers');
const {
  createContentSchema,
  updateContentSchema,
  validate,
} = require('../validators/contentItem.validator');

const createContentService = (Model, entityLabel = 'Item') => {
  const getAll = async (filters = {}) => {
    const query = buildContentQuery(filters, ['title', 'content', 'description', 'source']);
    const usePagination = filters.page !== undefined || filters.limit !== undefined;

    if (!usePagination) {
      return Model.find(query).sort({ date: -1, createdAt: -1 });
    }

    const { page, limit, skip } = parsePagination(filters.page, filters.limit);

    const [items, total] = await Promise.all([
      Model.find(query).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit),
      Model.countDocuments(query),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  };

  const getById = async (id, incrementViews = false) => {
    validateObjectId(id, `${entityLabel} ID`);

    if (incrementViews) {
      const item = await Model.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
      if (!item) throw new AppError(`${entityLabel} not found`, 404);
      return item;
    }

    const item = await Model.findById(id);
    if (!item) throw new AppError(`${entityLabel} not found`, 404);
    return item;
  };

  const create = async (payload) => {
    const data = validate(createContentSchema, payload);

    return Model.create({
      ...data,
      keywords: data.keywords || [],
    });
  };

  const update = async (id, payload) => {
    validateObjectId(id, `${entityLabel} ID`);
    const data = validate(updateContentSchema, payload);

    if (Object.keys(data).length === 0) {
      throw new AppError('No valid fields to update', 400);
    }

    const item = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!item) throw new AppError(`${entityLabel} not found`, 404);
    return item;
  };

  const remove = async (id) => {
    validateObjectId(id, `${entityLabel} ID`);

    const item = await Model.findByIdAndDelete(id);
    if (!item) throw new AppError(`${entityLabel} not found`, 404);
    return item;
  };

  return { getAll, getById, create, update, remove };
};

module.exports = { createContentService };
