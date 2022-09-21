const UserDAO = require("../dao/userDAO");
const RecodeDAO = require("../dao/recodeDAO");
const RedisDAO = require("../dao/redisDAO");
const { BadRequestError } = require("../../interface/errorType");

//새로운 유저 생성
async function createUserGetId() {
  //DB 유저생성
  const createdUserEntity = await UserDAO.createUser();

  //데이터가공
  const createdUserId = createdUserEntity.dataValues.id;

  //랭킹 리스트 삽입
  await RedisDAO.createRank(createdUserId);

  return createdUserId;
}

//
async function getUserScore(userId) {
  const userEntity = await UserDAO.getUserById(userId);
  if (!userEntity) {
    throw new BadRequestError("id에 해당하는 유저가 없습니다.");
  }

  //데이터가공
  const userTotalScore = userEntity.totalScore;
  return userTotalScore;
}

async function getUserRecode(userId) {
  const userRecodes = await RecodeDAO.getRecodeByUserId(userId);
  return userRecodes;
}

module.exports = {
  createUserGetId,
  getUserScore,
  getUserRecode,
};
