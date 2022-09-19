const UserService = require("../services/userService");
const BossRaidService = require("../services/bossRaidService");

const { StatusCodes } = require("http-status-codes");

async function createUser(req, res, next) {
  try {
    //생성된유저ID
    const createdUserId = await UserService.createUserGetId();

    return res.status(StatusCodes.OK).send({ userId: createdUserId });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.params.userId;

    //유저점수합계
    const userTotalScore = await UserService.getUserScore(userId);

    //보스레이드기록
    const userBossRaidHistory = await UserService.getUserRecode(userId);

    return res
      .status(StatusCodes.OK)
      .send({ totalScore: userTotalScore, bossRaidHistory: userBossRaidHistory });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser, getUser };
