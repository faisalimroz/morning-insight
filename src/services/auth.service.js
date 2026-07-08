const User = require('../models/User');

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

module.exports = { findOrCreateUser };
