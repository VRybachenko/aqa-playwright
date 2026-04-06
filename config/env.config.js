require('dotenv').config({ path: `.env.${process.env.ENV || 'qauto1'}` });

const envConfig = {
  baseUrl: process.env.BASE_URL,
  httpCredentials: {
    username: process.env.USERNAME,
    password: process.env.HTTP_PASSWORD,
  },
};

module.exports = envConfig;