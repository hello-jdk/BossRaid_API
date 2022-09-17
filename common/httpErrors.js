const { StatusCodes, getReasonPhrase } = require("http-status-codes");

//기본 에러 클래스
class BasicError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isCustom = true;
  }
}

//400 잘못된요청
class BadRequestError extends BasicError {
  constructor(message) {
    super("BadRequestError", message, StatusCodes.BAD_REQUEST);
  }
}

//401 인증자격요구
class UnauthorizedError extends BasicError {
  constructor(message) {
    super("Unautorized", message, StatusCodes.UNAUTHORIZED);
  }
}

//403 권한거절
class ForbiddenError extends BasicError {
  constructor(message) {
    super("Forbidden", message, StatusCodes.FORBIDDEN);
  }
}

//404
class NotFoundError extends BasicError {
  constructor(message) {
    super("NotFoundError", message, StatusCodes.NOT_FOUND);
  }
}

//409 리소스충돌
class ConflictError extends BasicError {
  constructor(message) {
    super("ConfilctError", message, StatusCodes.CONFLICT);
  }
}

// error 서버로그용
const errorLogger = (err, req, res, next) => {
  if (!err?.isCustom) {
    console.error(err);
  }
  next(err);
};

// error response 용
const errorResponser = (err, req, res, next) => {
  const { statusCode, message, isCustom } = err;
  if (isCustom) {
    res.status(statusCode).json({ message: message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
  next();
};

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  errorLogger,
  errorResponser,
};
