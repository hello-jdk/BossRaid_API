const { StatusCodes } = require("http-status-codes");
const BossRaidService = require("../services/bossRaidService");

//GET 레이드상태 조회
async function getRaidStatus(req, res, next) {
  try {
    //레이드상태 조회
    const raidStatus = await BossRaidService.getRaidStatus();

    //데이터 가공
    const canEnter = raidStatus.canEnter;
    const enteredUserId = raidStatus.enteredUserId;

    //응답
    if (canEnter) {
      return res.status(StatusCodes.OK).send({ canEnter: true });
    } else {
      return res.status(StatusCodes.OK).send({ canEnter: false, enteredUserId: enteredUserId });
    }
  } catch (error) {
    next(error);
  }
}

//POST 레이드 입장
async function enterRaid(req, res, next) {
  const { userId, level } = req.body;

  try {
    //레이드 입장가능 여부
    const raidStatus = await BossRaidService.getRaidStatus();
    const canEnter = raidStatus.canEnter;

    //입장불가시 응답
    if (!canEnter) {
      return res.status(StatusCodes.OK).send({ isEntered: false });
    }

    //레이드 입장
    const { raidRecordId } = await BossRaidService.enterRaid(userId, level);

    //응답
    return res.status(StatusCodes.OK).send({ isEntered: true, raidRecordId: raidRecordId });
  } catch (error) {
    next(error);
  }
}

//PATCH 레이드 퇴장
async function endRaid(req, res, next) {
  const { userId, raidRecordId } = req.body;
  try {
    //해당기록 존재여부
    const recode = await BossRaidService.getRaidRecode(userId, raidRecordId);

    //레이드 퇴장
    await BossRaidService.endRaid(recode);

    //응답
    return res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
}

//GET 랭킹리스트 조회
async function getRankerList(req, res, next) {
  const { userId } = req.body;

  try {
    // 전체 리스트 조회
    const topRankerInfoList = await BossRaidService.getTopRankList();
    // 내 랭킹정보 조회
    // const myRankingInfo = await BossRaidService.getMyRankingInfo(userId);

    //응답
    return res
      .status(StatusCodes.OK)
      .send({ topRankerInfoList: topRankerInfoList, myRankingInfo: "myRankingInfo" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRaidStatus,
  enterRaid,
  endRaid,
  getRankerList,
};
