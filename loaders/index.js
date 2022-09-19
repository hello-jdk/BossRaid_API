const logger = require("morgan");
const express = require("express");

const { errorLogger, errorResponser } = require("./errorHandler");
const { sequelize, redis } = require("../models");
const { router } = require("../routes");

async function loader(app) {
  //MYSQL
  await databaseConnection();

  //Redis
  const redisClient = await redisConnection();

  //log
  app.use(logger("dev"));

  //express
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //custom
  routerRegister(app);
  errorHandler(app);

  return app;
}

//MYSQL
async function databaseConnection() {
  await sequelize.sync({ force: false, alter: true }).catch((error) => {
    console.error(error);
    process.exit(1);
  });

  console.log("[MYSQL] 설정 완료");
}

//REDIS
async function redisConnection() {
  redis.on("connect", () => {
    console.info("[REDIS] 설정 완료");
  });

  redis.on("error", (error) => {
    console.error(error);
  });

  await redis.connect().then();
}

//Router
function routerRegister(app) {
  app.use("/api", router);

  console.log("[routerResiter] 설정 완료");
  return app;
}

//ErrorHandling
function errorHandler(app) {
  app.use(errorLogger);
  app.use(errorResponser);

  console.log("[errorHandler] 설정 완료");
  return app;
}

//TODO: 많아지면 모듈로 나누기
module.exports = { loader };
