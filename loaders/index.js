const logger = require("morgan");
const express = require("express");

const { errorLogger, errorResponser } = require("../common/httpErrors");

async function loader(app) {
  //log
  app.use(logger("dev"));

  //http
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
  app.use("/api/users", (req, res, next) => {
    console.log("api users");
  });

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

//TODO: 많아지면 모듈로 나누기

module.exports = { loader };
