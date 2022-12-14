const UserService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

//POST 유저생성
async function createUser(req, res, next) {
  try {
    //새로운 유저 생성
    const createdUserId = await UserService.createUserGetId();

    //응답
    return res.status(StatusCodes.OK).send({ userId: createdUserId });
  } catch (error) {
    next(error);
  }
}

//GET 유저조회
async function getUser(req, res, next) {
  try {
    const userId = req.params.userId;

    //유저점수합계 조회
    const userTotalScore = await UserService.getUserTotalScore(userId);

    //보스레이드기록 조회
    const userBossRaidHistory = await UserService.getUserRecode(userId);

    //응답
    return res
      .status(StatusCodes.OK)
      .send({ totalScore: userTotalScore, bossRaidHistory: userBossRaidHistory });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getUser,
};
