const mongoose = require('mongoose');
const AppError = require('./AppError');

const validateObjectId = (id, label = 'ID') => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${label}`, 400);
  }
};

const parsePagination = (page, limit, defaultLimit = 20) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || defaultLimit));
  const skip = (pageNum - 1) * limitNum;
  return { page: pageNum, limit: limitNum, skip };
};

const buildTextSearch = (search, fields) => {
  if (!search || !String(search).trim()) {
    return {};
  }
  const regex = { $regex: String(search).trim(), $options: 'i' };
  return { $or: fields.map((field) => ({ [field]: regex })) };
};

const buildDateFilter = (dateStr) => {
  if (!dateStr) {
    return {};
  }
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    throw new AppError('Invalid date format. Use YYYY-MM-DD', 400);
  }
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);
  return { createdAt: { $gte: start, $lte: end } };
};

const buildPaginatedResult = (items, total, page, limit) => ({
  items,
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 0,
  },
});

const mergeFilters = (...filters) => {
  const conditions = filters.filter((f) => f && Object.keys(f).length > 0);
  if (conditions.length === 0) {
    return {};
  }
  if (conditions.length === 1) {
    return conditions[0];
  }
  return { $and: conditions };
};

const validateRequiredString = (value, fieldName) => {
  if (!value || !String(value).trim()) {
    throw new AppError(`${fieldName} is required`, 400);
  }
  return String(value).trim();
};

module.exports = {
  validateObjectId,
  parsePagination,
  buildTextSearch,
  buildDateFilter,
  buildPaginatedResult,
  mergeFilters,
  validateRequiredString,
};
