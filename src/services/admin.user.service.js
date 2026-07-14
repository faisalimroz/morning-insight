const User = require('../models/user.model');
const AppError = require('../utils/AppError');
const {
  validateObjectId,
  parsePagination,
  buildTextSearch,
  buildPaginatedResult,
  mergeFilters,
} = require('../utils/queryHelpers');

const VALID_ROLES = ['user', 'admin'];

const buildUserQuery = (filters = {}) => {
  const { search, role, origin } = filters;
  const conditions = [];

  if (search) {
    conditions.push(buildTextSearch(search, ['name', 'email', 'origin']));
  }

  if (role) {
    if (!VALID_ROLES.includes(role)) {
      throw new AppError('Invalid role. Must be user or admin', 400);
    }
    conditions.push({ role });
  }

  if (origin) {
    conditions.push({ origin: String(origin).trim() });
  }

  return mergeFilters(...conditions);
};

const getUsers = async (filters = {}) => {
  const { page, limit, skip } = parsePagination(filters.page, filters.limit);
  const query = buildUserQuery(filters);

  const [items, total] = await Promise.all([
    User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(query),
  ]);

  return buildPaginatedResult(items, total, page, limit);
};

const getUserById = async (id) => {
  validateObjectId(id, 'user ID');

  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

const updateUser = async (id, payload) => {
  validateObjectId(id, 'user ID');

  const allowedFields = [
    'name',
    'email',
    'picture',
    'address',
    'interests',
    'url',
    'origin',
    'role',
  ];
  const updates = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  }

  if (updates.role !== undefined && !VALID_ROLES.includes(updates.role)) {
    throw new AppError('Invalid role. Must be user or admin', 400);
  }

  if (updates.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updates.email)) {
      throw new AppError('Invalid email format', 400);
    }
    updates.email = updates.email.toLowerCase().trim();
  }

  if (updates.interests !== undefined) {
    if (!Array.isArray(updates.interests)) {
      throw new AppError('Interests must be an array', 400);
    }
    if (updates.interests.length > 5) {
      throw new AppError('Interests cannot exceed 5 items', 400);
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError('No valid fields to update', 400);
  }

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError('Email already exists', 409);
    }
    throw err;
  }
};

const deleteUser = async (id) => {
  validateObjectId(id, 'user ID');

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
