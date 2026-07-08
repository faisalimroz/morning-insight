const axios = require('axios');
const AppError = require('../utils/AppError');

const KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';

const verifyAccessToken = async (accessToken) => {
  try {
    const response = await axios.get(KAKAO_USER_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = response.data;

    return {
      providerId: data.id.toString(),
      email: data.kakao_account?.email,
      name: data.properties?.nickname,
      picture: data.properties?.profile_image,
    };
  } catch {
    throw new AppError('Invalid token', 500);
  }
};

module.exports = { verifyAccessToken };
