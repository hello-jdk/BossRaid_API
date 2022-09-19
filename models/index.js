const Sequelize = require("sequelize");
const Redis = require("redis");
const { MYSQL, REDIS } = require("../config");

////MYSQL
const sequelize = new Sequelize(MYSQL.DATABASE, MYSQL.USERNAME, MYSQL.PASSWORD, {
  host: MYSQL.HOST,
  dialect: MYSQL.DIALECT,
  logging: false,
});

//모델 정의
const defineUserModel = require("./userModel");
const defineRecodeModel = require("./recodeModel");

const userModel = defineUserModel(sequelize);
const recodeModel = defineRecodeModel(sequelize);

//관계성 정의
Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

////REDIS
const redis = Redis.createClient({
  url: `redis://${REDIS.USERNAME}:${REDIS.PASSWORD}@${REDIS.HOST}:${REDIS.PORT}/0`,
});

module.exports = { sequelize, userModel, recodeModel, redis };
