// const User = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const AppError = require('../utils/AppError');
// const { blacklistToken } = require('./token.service');

// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const PROFILE_FIELDS = ['email', 'name', 'picture'];
// const INTERESTS_UPDATE_ROUTE = '/api/v1/auth/interests';

// const applyProfileUpdates = (user, profile, fields) => {
//   for (const field of fields) {
//     if (profile[field] !== undefined && profile[field] !== null) {
//       user[field] = profile[field];
//     }
//   }
// };

// const validateInterests = (interests) => {
//   if (!Array.isArray(interests)) {
//     throw new AppError('Interests must be an array of strings', 400);
//   }
//   if (interests.length > 5) {
//     throw new AppError('Interests cannot exceed 5 items', 400);
//   }
//   return interests;
// };

// const buildInterestStatus = (user) => {
//   const requiresInterests = !user.interests || user.interests.length === 0;
//   return {
//     requiresInterests,
//     interestsUpdateRoute: requiresInterests ? INTERESTS_UPDATE_ROUTE : undefined,
//   };
// };

// const findOrCreateUser = async (provider, profile, options = {}) => {
//   const { updateOnExisting = PROFILE_FIELDS } = options;
//   const { providerId } = profile;

//   let user = await User.findOne({ provider, providerId });
//   if (!user) {
//     user = await User.create({
//       provider,
//       providerId,
//       email: profile.email,
//       name: profile.name,
//       picture: profile.picture,
//     });
//     return user;
//   }

//   applyProfileUpdates(user, profile, updateOnExisting);
//   await user.save();
//   return user;
// };
// const crypto = require('crypto');

// const registerUser = async (payload) => {
//   const {
//     name,
//     email,
//     password,
//     picture,
//     address,
//     provider,
//     providerId,
//     url = '',
//     origin = '',
//   } = payload;

//   if (!name || !email || !password) {
//     throw new AppError(
//       'Name, email, and password are required',
//       400
//     );
//   }

//   const normalizedEmail = email.toLowerCase().trim();

//   if (!EMAIL_REGEX.test(normalizedEmail)) {
//     throw new AppError('Invalid email format', 400);
//   }

//   const existingUser = await User.findOne({
//     email: normalizedEmail,
//   });

//   if (existingUser) {
//     throw new AppError('Email already exists', 409);
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const normalizedProvider =
//     typeof provider === 'string' && provider.trim()
//       ? provider.trim().toLowerCase()
//       : 'local';

//   let normalizedProviderId =
//     typeof providerId === 'string'
//       ? providerId.trim()
//       : '';

//   /*
//    * When provider/providerId are missing or empty,
//    * create a unique ID for the local account.
//    */
//   if (
//     normalizedProvider === 'local' &&
//     !normalizedProviderId
//   ) {
//     normalizedProviderId = `local-${crypto.randomUUID()}`;
//   }

//   /*
//    * OAuth providers must provide their actual provider ID.
//    */
//   if (
//     normalizedProvider !== 'local' &&
//     !normalizedProviderId
//   ) {
//     throw new AppError(
//       `Provider ID is required for ${normalizedProvider} login`,
//       400
//     );
//   }

//   const existingProviderAccount = await User.findOne({
//     provider: normalizedProvider,
//     providerId: normalizedProviderId,
//   });

//   if (existingProviderAccount) {
//     throw new AppError(
//       'This provider account is already registered',
//       409
//     );
//   }

//   try {
//     const user = await User.create({
//       name: name.trim(),
//       email: normalizedEmail,
//       password: hashedPassword,
//       picture: picture || undefined,
//       address: address || undefined,
//       interests: [],
//       provider: normalizedProvider,
//       providerId: normalizedProviderId,
//       url: url || '',
//       origin: origin || '',
//       role: 'user',
//     });

//     return await User.findById(user._id).select('-password');
//   } catch (error) {
//     if (error?.code === 11000) {
//       if (error?.keyPattern?.email) {
//         throw new AppError('Email already exists', 409);
//       }

//       if (
//         error?.keyPattern?.provider &&
//         error?.keyPattern?.providerId
//       ) {
//         throw new AppError(
//           'This provider account is already registered',
//           409
//         );
//       }
//     }

//     throw error;
//   }
// };
// // const registerUser = async (payload) => {
// //   const {
// //     name,
// //     email,
// //     password,
// //     picture,
// //     address,
// //     provider = null,
// //     providerId = null,
// //     url = '',
// //     origin = '',
// //   } = payload;

// //   if (!name || !email || !password) {
// //     throw new AppError('Name, email, and password are required', 400);
// //   }

// //   if (!EMAIL_REGEX.test(email)) {
// //     throw new AppError('Invalid email format', 400);
// //   }

// //   const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
// //   if (existingUser) {
// //     throw new AppError('Email already exists', 400);
// //   }

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   const user = await User.create({
// //     name,
// //     email: email.toLowerCase().trim(),
// //     password: hashedPassword,
// //     picture: picture || undefined,
// //     address: address || undefined,
// //     interests: [],
// //     provider,
// //     providerId,
// //     url,
// //     origin,
// //     role: 'user',
// //   });

// //   return User.findById(user._id).select('-password');
// // };

// const loginUser = async (payload) => {
//   const { email, password, interests } = payload;

//   if (!email || !password) {
//     throw new AppError('Email and password are required', 400);
//   }

//   const user = await User.findOne({ email: email.toLowerCase().trim() });
//   if (!user) {
//     throw new AppError('Invalid credentials', 401);
//   }

//   if (!user.password) {
//     throw new AppError('Invalid credentials', 401);
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new AppError('Invalid credentials', 401);
//   }

//   if (interests !== undefined) {
//     user.interests = validateInterests(interests);
//     await user.save();
//   }

//   const freshUser = await User.findById(user._id).select('-password');
//   const interestStatus = buildInterestStatus(freshUser);

//   return {
//     user: freshUser,
//     ...interestStatus,
//   };
// };

// const logoutUser = async (token) => {
//   await blacklistToken(token);
// };

// const getProfile = async (userId) => {
//   const user = await User.findById(userId).select('-password');
//   if (!user) {
//     throw new AppError('User not found', 404);
//   }
//   return user;
// };

// const updateProfile = async (userId, payload) => {
//   const { name, address, picture, url, origin } = payload;
//   const updates = {};
//   if (name !== undefined) updates.name = name;
//   if (address !== undefined) updates.address = address;
//   if (picture !== undefined) updates.picture = picture;
//   if (url !== undefined) updates.url = url;
//   if (origin !== undefined) updates.origin = origin;

//   const user = await User.findByIdAndUpdate(userId, updates, {
//     new: true,
//     runValidators: true,
//   }).select('-password');

//   if (!user) {
//     throw new AppError('User not found', 404);
//   }
//   return user;
// };

// const updateInterests = async (userId, interests) => {
//   const validatedInterests = validateInterests(interests);

//   const user = await User.findByIdAndUpdate(
//     userId,
//     { interests: validatedInterests },
//     { new: true, runValidators: true },
//   ).select('-password');

//   if (!user) {
//     throw new AppError('User not found', 404);
//   }

//   return user;
// };
// const forgotPassword = async (email) => {
//   if (!email) {
//     throw new AppError('Email is required', 400);
//   }

//   const normalizedEmail = email.toLowerCase().trim();
//   const user = await User.findOne({ email: normalizedEmail });

//   if (!user) {
//     throw new AppError('There is no user with that email address', 404);
//   }

//   // Generate a short-lived JWT specifically for resetting password (valid for 10 mins)
//   const resetToken = jwtService.sign(user._id, 'reset');

//   return resetToken;
// };

// const resetPassword = async (token, newPassword) => {
//   if (!token || !newPassword) {
//     throw new AppError('Token and new password are required', 400);
//   }

//   let decoded;
//   try {
//     decoded = jwtService.verify(token);
//   } catch (error) {
//     throw new AppError('Token is invalid or has expired', 400);
//   }

//   const userId = decoded.userId || decoded.id;
//   const user = await User.findById(userId);

//   if (!user) {
//     throw new AppError('User belonging to this token no longer exists', 404);
//   }

//   user.password = await bcrypt.hash(newPassword, 10);
//   await user.save();

//   return user;
// };
// module.exports = {
//   findOrCreateUser,
//   registerUser,
//   loginUser,
//   logoutUser,
//   getProfile,
//   updateProfile,
//   updateInterests,
//   buildInterestStatus,
//   forgotPassword,    
//   resetPassword,
//   INTERESTS_UPDATE_ROUTE,
// };


const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const { blacklistToken } = require('./token.service');
const jwtService = require('./jwt.service');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROFILE_FIELDS = ['email', 'name', 'picture'];
const INTERESTS_UPDATE_ROUTE = '/api/v1/auth/interests';

const applyProfileUpdates = (user, profile, fields) => {
  for (const field of fields) {
    if (profile[field] !== undefined && profile[field] !== null) {
      user[field] = profile[field];
    }
  }
};

const validateInterests = (interests) => {
  if (!Array.isArray(interests)) {
    throw new AppError('Interests must be an array of strings', 400);
  }
  if (interests.length > 5) {
    throw new AppError('Interests cannot exceed 5 items', 400);
  }
  return interests;
};

const buildInterestStatus = (user) => {
  const requiresInterests = !user.interests || user.interests.length === 0;
  return {
    requiresInterests,
    interestsUpdateRoute: requiresInterests ? INTERESTS_UPDATE_ROUTE : undefined,
  };
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
    provider,
    providerId,
    url = '',
    origin = '',
  } = payload;

  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new AppError('Invalid email format', 400);
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new AppError('Email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const normalizedProvider =
    typeof provider === 'string' && provider.trim()
      ? provider.trim().toLowerCase()
      : 'local';

  let normalizedProviderId =
    typeof providerId === 'string' ? providerId.trim() : '';

  if (normalizedProvider === 'local' && !normalizedProviderId) {
    normalizedProviderId = `local-${crypto.randomUUID()}`;
  }

  if (normalizedProvider !== 'local' && !normalizedProviderId) {
    throw new AppError(
      `Provider ID is required for ${normalizedProvider} login`,
      400
    );
  }

  const existingProviderAccount = await User.findOne({
    provider: normalizedProvider,
    providerId: normalizedProviderId,
  });

  if (existingProviderAccount) {
    throw new AppError('This provider account is already registered', 409);
  }

  try {
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      picture: picture || undefined,
      address: address || undefined,
      interests: [],
      provider: normalizedProvider,
      providerId: normalizedProviderId,
      url: url || '',
      origin: origin || '',
      role: 'user',
    });

    return await User.findById(user._id).select('-password');
  } catch (error) {
    if (error?.code === 11000) {
      if (error?.keyPattern?.email) {
        throw new AppError('Email already exists', 409);
      }
      if (error?.keyPattern?.provider && error?.keyPattern?.providerId) {
        throw new AppError('This provider account is already registered', 409);
      }
    }
    throw error;
  }
};

const loginUser = async (payload) => {
  const { email, password, interests } = payload;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user || !user.password) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  if (interests !== undefined) {
    user.interests = validateInterests(interests);
    await user.save();
  }

  const freshUser = await User.findById(user._id).select('-password');
  const interestStatus = buildInterestStatus(freshUser);

  return {
    user: freshUser,
    ...interestStatus,
  };
};

const logoutUser = async (token) => {
  await blacklistToken(token);
};

const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

const updateProfile = async (userId, payload) => {
  const { name, address, picture, url, origin } = payload;
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (address !== undefined) updates.address = address;
  if (picture !== undefined) updates.picture = picture;
  if (url !== undefined) updates.url = url;
  if (origin !== undefined) updates.origin = origin;

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
  const validatedInterests = validateInterests(interests);

  const user = await User.findByIdAndUpdate(
    userId,
    { interests: validatedInterests },
    { new: true, runValidators: true },
  ).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

const forgotPassword = async (email) => {
  if (!email) {
    throw new AppError('Email is required', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new AppError('There is no user with that email address', 404);
  }

  // Generate a short-lived JWT reset token
  const resetToken = jwtService.sign(user._id, 'reset');

  return resetToken; // Return it directly
};
const resetPassword = async (token, newPassword) => {
  if (!token || !newPassword) {
    throw new AppError('Token and new password are required', 400);
  }

  let decoded;
  try {
    decoded = jwtService.verify(token);
  } catch (error) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  const userId = decoded.userId || decoded.id;
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User belonging to this token no longer exists', 404);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return user;
};

module.exports = {
  findOrCreateUser,
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  updateInterests,
  buildInterestStatus,
  INTERESTS_UPDATE_ROUTE,
  forgotPassword,
  resetPassword,
};