const Sequelize = require("sequelize");
const { MYSQL } = require("../config");

const sequelize = new Sequelize(MYSQL.DATABASE, MYSQL.USERNAME, MYSQL.PASSWORD, {
  host: MYSQL.HOST,
  dialect: MYSQL.DIALECT,
  logging: true,
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

module.exports = { sequelize, userModel, recodeModel };
