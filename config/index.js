require("dotenv").config();

//.env을 이용한 설정 값

/**
 * SERVER PORT
 */
const PORT = process.env.PORT;

module.exports = { PORT };

//TODO: 많아지면 모듈로 나누기
