const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '1h',
  APP_VERSION : process.env.APP_VERSION || 'v1',
  FRONTEND_URL : process.env.NODE_ENV === 'development' ? process.env.LOCAL_FRONTEND_URL:process.env.LIVE_FRONTEND_URL
};