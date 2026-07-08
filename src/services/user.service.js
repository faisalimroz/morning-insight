const User = require('../models/User');
const AppError = require('../utils/AppError');

const getAllUsers = () => User.find();

const getUserById = (id) => User.findById(id);

const createUser = async (payload) => {
  const { provider, providerId, email, name, picture, avatar, address, description } =
    payload;

  if (!provider || !providerId) {
    throw new AppError('provider and providerId are required', 400);
  }

  try {
    return await User.create({
      provider,
      providerId,
      email,
      name,
      picture,
      avatar,
      address,
      description,
    });
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError('User already exists', 409);
    }
    throw err;
  }
};

const updateUser = async (id, payload) => {
  const allowedFields = ['email', 'name', 'picture', 'avatar', 'address', 'description'];
  const updates = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
