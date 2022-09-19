const { StatusCodes, getReasonPhrase } = require("http-status-codes");

// error 서버로그용
const errorLogger = (err, req, res, next) => {
  if (!err?.isCustom) {
    console.error(err);
  }
  next(err);
};

// error response용
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

module.exports = { errorLogger, errorResponser };
