const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

const PROFILE_FIELDS = ['email', 'name', 'picture'];

const applyProfileUpdates = (user, profile, fields) => {
  for (const field of fields) {
    if (profile[field] !== undefined && profile[field] !== null) {
      user[field] = profile[field];
    }
  }
};

const findOrCreateUser = async (provider, profile, options = {}) => {
  const { updateOnExisting = PROFILE_FIELDS } = options;
  const { providerId } = profile;

  let user = await User.findOne({ provider, providerId });
  if (!user) {
    user = await User.create({
      provider,
      providerId,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });
    return user;
  }

  applyProfileUpdates(user, profile, updateOnExisting);
  await user.save();
  return user;
};
const registerUser = async (payload) => {
  const {
    name,
    email,
    password,
    picture,
    address,
    interests = [],
    provider = null,
    providerId = null,
    url = '',
    origin = '',
    role,                    // Don't set default here
  } = payload;

  // Validations
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Invalid email format', 400);
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Determine role safely
  const finalRole = role && ['user', 'admin'].includes(role) 
    ? role 
    : 'user';

  const user = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    picture: picture || undefined,
    address: address || undefined,
    interests: interests.slice(0, 5),
    provider,
    providerId,
    url,
    origin,
    role: finalRole,           // Safe role assignment
  });

  return user;
};
// const registerUser = async (payload) => {
//   const {
//     name,
//     email,
//     password,
//     picture,
//     address,
//     interests = [],
//     provider,        // Can be "google", "apple", null, or undefined
//     providerId,
//     url = '',
//     origin = '',
//   } = payload;

//   // Basic validation
//   if (!name || !email || !password) {
//     throw new AppError('Name, email, and password are required', 400);
//   }

//   // Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     throw new AppError('Invalid email format', 400);
//   }

//   // Check existing user
//   const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
//   if (existingUser) {
//     throw new AppError('Email already exists', 400);
//   }

//   // Hash password (only for manual registration)
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create user
//   const user = await User.create({
//     name,
//     email: email.toLowerCase().trim(),
//     password: hashedPassword,
//     picture: picture || undefined,
//     address: address || undefined,
//     interests: interests.slice(0, 5),
//     provider: provider || null,           // null for manual registration
//     providerId: providerId || null,       // null if no social provider
//     url,
//     origin,
//     role: '',
//   });

//   return user;
// };
// const registerUser = async (payload) => {
//   // const { name, email, password, picture, address } = payload;
// const {
//   name,
//   email,
//   password,
//   picture,
//   address,
//   interests,
//   provider,
//   providerId
// } = payload;
//   if (!name || !email || !password || !picture || !address) {
//     throw new AppError('All fields (name, email, password, picture, address) are required', 400);
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     throw new AppError('Invalid email format', 400);
//   }

//   const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
//   if (existingUser) {
//     throw new AppError('Email already exists', 400);
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email: email.toLowerCase().trim(),
//     password: hashedPassword,
//     picture,
//     address,
//     provider,
//     url: payload.url || '',
//     origin: payload.origin || '',
//     role: 'user',
//   });

//   return user;
// };

const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

const updateProfile = async (userId, payload) => {
  const { name, address, picture } = payload;
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (address !== undefined) updates.address = address;
  if (picture !== undefined) updates.picture = picture;

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

const updateInterests = async (userId, interests) => {
  if (!Array.isArray(interests)) {
    throw new AppError('Interests must be an array of strings', 400);
  }
  if (interests.length > 5) {
    throw new AppError('Interests cannot exceed 5 items', 400);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { interests },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

module.exports = {
  findOrCreateUser,
  registerUser,
  getProfile,
  updateProfile,
  updateInterests
};
