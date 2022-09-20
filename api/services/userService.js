const UserDAO = require("../dao/userDAO");
const RecodeDAO = require("../dao/recodeDAO");
const RedisDAO = require("../dao/redisDAO");
const { BadRequestError } = require("../../interface/errorType");

//TODO: 두개로 나누기
async function createUserGetId() {
  const createdUserEntity = await UserDAO.createUser();

  //데이터가공
  const createdUserId = createdUserEntity.dataValues.id;
  return createdUserId;
}

async function createUserOfRankList(userId) {
  await RedisDAO.createRank(userId);
}

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
  createUserOfRankList,
  getUserScore,
  getUserRecode,
};
