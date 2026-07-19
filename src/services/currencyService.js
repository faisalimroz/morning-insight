const axios = require('axios');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const AppError = require('../utils/AppError');

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const LOCAL_CURRENCY = process.env.LOCAL_CURRENCY || 'BDT';

let memoryCache = null;
let redisClient = null;

const getRedisClient = async () => {
  if (redisClient) return redisClient;
  if (!process.env.REDIS_URL) return null;

  const Redis = require('ioredis');
  redisClient = new Redis(process.env.REDIS_URL);
  return redisClient;
};

const getSecret = async (secretResourceName) => {
  if (!secretResourceName) return null;

  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({ name: secretResourceName });
  return version.payload.data.toString('utf8');
};

const formatPercent = (value) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

const calcChangePercent = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const fetchExchangeRates = async () => {
  const apiKey = await getSecret(process.env.EXCHANGE_RATE_API_SECRET);

  if (apiKey) {
    const { data } = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    return {
      today: data.conversion_rates[LOCAL_CURRENCY],
      source: 'exchangerate-api',
      history: null,
    };
  }

  const todayRes = await axios.get(
    `https://api.frankfurter.app/latest?from=USD&to=${LOCAL_CURRENCY}`,
  );
  const today = todayRes.data.rates[LOCAL_CURRENCY];

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);

  const historyRes = await axios.get(
    `https://api.frankfurter.app/${start.toISOString().slice(0, 10)}..${end.toISOString().slice(0, 10)}?from=USD&to=${LOCAL_CURRENCY}`,
  );

  return { today, source: 'frankfurter', history: historyRes.data.rates };
};

const fetchInflationRate = async () => {
  const countryCode = process.env.WB_COUNTRY_CODE || 'BD';
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json&per_page=2`;

  const { data } = await axios.get(url);
  const rows = data?.[1] || [];
  const latest = rows[0];

  if (!latest?.value) {
    throw new AppError('Inflation data unavailable', 503);
  }

  return {
    rate: latest.value,
    year: latest.date,
  };
};

const buildComparison = (historyRates, todayRate) => {
  const dates = Object.keys(historyRates || {}).sort();
  const getRate = (date) => historyRates[date]?.[LOCAL_CURRENCY];

  const yesterdayDate = dates[dates.length - 2];
  const day7Date = dates[Math.max(0, dates.length - 8)];
  const day30Date = dates[0];

  const yesterday = getRate(yesterdayDate);
  const day7 = getRate(day7Date);
  const day30 = getRate(day30Date);

  return {
    vsYesterday: {
      value: yesterday,
      change: formatPercent(calcChangePercent(todayRate, yesterday)),
    },
    vs7Days: {
      value: day7,
      change: formatPercent(calcChangePercent(todayRate, day7)),
    },
    vs30Days: {
      value: day30,
      change: formatPercent(calcChangePercent(todayRate, day30)),
    },
  };
};

const getCached = async (key) => {
  const redis = await getRedisClient();
  if (redis) {
    const raw = await redis.get(key);
    return raw ? JSON.parse(raw) : null;
  }

  if (memoryCache && memoryCache.expiresAt > Date.now()) {
    return memoryCache.data;
  }
  return null;
};

const setCached = async (key, data) => {
  const redis = await getRedisClient();
  const ttlSeconds = CACHE_TTL_MS / 1000;

  if (redis) {
    await redis.set(key, JSON.stringify(data), 'EX', ttlSeconds);
    return;
  }

  memoryCache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
};

const getDailyRate = async () => {
  const cacheKey = `currency:daily:${LOCAL_CURRENCY}`;
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const [{ today, history }, inflation] = await Promise.all([
    fetchExchangeRates(),
    fetchInflationRate(),
  ]);

  const comparison = buildComparison(history, today);
  const vsYesterdayChange = comparison.vsYesterday.change;

  const payload = {
    date: new Date().toISOString().slice(0, 10),
    usdToLocal: Number(today.toFixed(2)),
    change: vsYesterdayChange,
    inflationRate: `${Number(inflation.rate).toFixed(1)}%`,
    inflationYear: inflation.year,
    comparison,
  };

  await setCached(cacheKey, payload);
  return payload;
};

module.exports = { getDailyRate };
