const axios = require('axios');
const AppError = require('../utils/AppError');

const NAVER_USER_URL = 'https://openapi.naver.com/v1/nid/me';

const verifyAccessToken = async (accessToken) => {
  try {
    const response = await axios.get(NAVER_USER_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = response.data.response;

    return {
      providerId: data.id,
      email: data.email,
      name: data.name,
      picture: data.profile_image,
    };
  } catch {
    throw new AppError('Invalid token', 500);
  }
};

module.exports = { verifyAccessToken };
