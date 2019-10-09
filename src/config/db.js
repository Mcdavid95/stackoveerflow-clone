import dotenv from 'dotenv';

dotenv.config();

export default {
  url: process.env.MONGODB_URI,
  url_production: process.env.MONGODB_URI,
  url_test: process.env.TEST_MONGODB_URI
};
