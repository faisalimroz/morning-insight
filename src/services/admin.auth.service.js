const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const { blacklistToken } = require('./token.service');

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
  const existingAdmin = await Admin.findOne({ email: normalizedEmail });
  if (existingAdmin) {
    throw new AppError('Email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name: String(name).trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  return Admin.findById(admin._id).select('-password');
};

const loginAdmin = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  return Admin.findById(admin._id).select('-password');
};

const logoutAdmin = async (token) => {
  await blacklistToken(token);
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
};
