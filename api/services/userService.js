const UserRepository = require("../dao/userDAO");
const RecodeRepository = require("../dao/recodeDAO");

const { BadRequestError } = require("../../interface/errorType");

//TODO: 두개로 나누기
async function createUserGetId() {
  const createdUserEntity = await UserRepository.createUser();

  //데이터가공
  const createdUserId = createdUserEntity.dataValues.id;
  return createdUserId;
}

async function getUserScore(userId) {
  const userEntity = await UserRepository.getUserById(userId);
  if (!userEntity) {
    throw new BadRequestError("id에 해당하는 유저가 없습니다.");
  }

  //데이터가공
  const userTotalScore = userEntity.totalScore;
  return userTotalScore;
}

async function getUserRecode(userId) {
  const userRecodes = await RecodeRepository.getRecodeByUserId(userId);
  return userRecodes;
}

module.exports = { createUserGetId, getUserScore, getUserRecode };
