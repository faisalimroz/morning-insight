const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerAdmin = async (payload) => {
  const { name, email, password } = payload;

  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError('Invalid email format', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new AppError('Email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
// name: String(name).trim(),
  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: 'admin',
  });

  return User.findById(user._id).select('-password');
};

const loginAdmin = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user || user.role !== 'admin') {
    throw new AppError('Invalid credentials', 401);
  }

  if (!user.password) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  return User.findById(user._id).select('-password');
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
