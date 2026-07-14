const axios = require('axios');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');

// Global cache variables
let quoteCache = {
  data: null,
  fetchedAt: null,
};

let weatherCache = {
  // key: location name in lowercase
  // value: { data, fetchedAt }
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getDailyInspiration = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const location = user.address;
  const locKey = location.toLowerCase().trim();
  console.log(`Fetching daily inspiration for user ${userId} at location: ${location} (${locKey}) `);  
  const now = Date.now();

  // 1. Resolve quote
  if (!quoteCache.data || !quoteCache.fetchedAt || (now - quoteCache.fetchedAt > ONE_DAY_MS)) {
    try {
      const response = await axios.get('https://zenquotes.io/api/today');
      if (response.data && response.data[0]) {
        quoteCache.data = {
          quote: response.data[0].q,
          author: response.data[0].a,
        };
        quoteCache.fetchedAt = now;
      }
    } catch (err) {
      console.error('Error fetching daily quote:', err.message);
      if (!quoteCache.data) {
        quoteCache.data = {
          quote: "The only limit to our realization of tomorrow will be our doubts of today.",
          author: "Franklin D. Roosevelt",
        };
      }
    }
  }

  // 2. Resolve weather
  if (!weatherCache[locKey] || !weatherCache[locKey].fetchedAt || (now - weatherCache[locKey].fetchedAt > ONE_DAY_MS)) {
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('OPENWEATHER_API_KEY env variable is not configured');
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          locKey
        )}&appid=${apiKey}&units=metric`
      );
      weatherCache[locKey] = {
        data: {
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          location: response.data.name,
        },
        fetchedAt: now,
      };
    } catch (err) {
      console.error(`Error fetching weather for location "${location}":`, err.message);
      if (!weatherCache[locKey]) {
        weatherCache[locKey] = {
          data: {
            temp: 20,
            description: 'Clear sky (Mock)',
            location: location,
          },
          fetchedAt: now,
        };
      }
    }
  }

  return {
    quote: quoteCache.data,
    weather: weatherCache[locKey].data,
  };
};

module.exports = {
  getDailyInspiration,
};
