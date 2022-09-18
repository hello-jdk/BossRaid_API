require("dotenv").config();

/**
 * SERVER PORT
 */
const PORT = process.env.PORT;

/**
 * REDIS config
 */
const REDIS = {
  HOST: process.env.REDIS_HOST,
  PORT: process.env.REDIS_PORT,
  USERNAME: process.env.REDIS_USERNAME,
  PASSWORD: process.env.REDIS_PASSWORD,
};

/**
 * MYSQL config
 */
const MYSQL = {
  HOST: process.env.DB_HOST,
  DATABASE: process.env.DB_DATABASE,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DIALECT: "mysql",
};

module.exports = { PORT, REDIS, MYSQL };

//TODO: 많아지면 모듈로 나누기
