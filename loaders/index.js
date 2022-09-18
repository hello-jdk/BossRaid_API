const logger = require("morgan");
const express = require("express");

const { errorLogger, errorResponser } = require("../common/httpErrors");
const router = require("../routes");

async function loader(app) {
  //MYSQL
  await databaseConnection();

  //log
  app.use(logger("dev"));

  //express
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //custom
  routerRegister(app);
  errorHandler(app);

  console.log("[ㄴloaders] 완료");
  return app;
}

//routes
function routerRegister(app) {
  app.use("/api", router);

  console.log("[routerResiter] 설정 완료");
  return app;
}

//errorHandling
function errorHandler(app) {
  app.use(errorLogger);
  app.use(errorResponser);

  console.log("[errorHandler] 설정 완료");
  return app;
}

//MYSQL
async function databaseConnection() {
  const { sequelize } = require("../models");

  await sequelize.sync({ force: false, alter: true }).catch((error) => {
    console.error(error);
    process.exit(1);
  });

  console.log("[MYSQL] 설정 완료");
}
//TODO: 많아지면 모듈로 나누기

module.exports = { loader };
