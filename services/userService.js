const UserRepository = require("./userRepository");

const { BadRequestError } = require("../common/httpErrors");

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

module.exports = { createUserGetId, getUserScore };
