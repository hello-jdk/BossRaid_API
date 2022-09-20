const moment = require("moment");
const { BadRequestError } = require("../../interface/errorType");
const UserDAO = require("../dao/userDAO");
const RecodeDAO = require("../dao/recodeDAO");
const RedisDAO = require("../dao/redisDAO");
const { RankingInfo } = require("../../interface/RankingInfo");

async function getRaidStatus() {
  const raidInfo = {};
  const raidStatus = await RedisDAO.checkRaidStatus();

  if (raidStatus == "1") {
    raidInfo.canEnter = true;
  } else {
    raidInfo.canEnter = false;
  }

  if (!raidInfo.canEnter) {
    raidInfo.enteredUserId = await RedisDAO.getEnteredUserId();
  }

  return raidInfo;
}

async function enterRaid(userId, level) {
  //레이드 정보있는지 확인
  const infoExist = await RedisDAO.checkRaidInfo(level);

  if (!infoExist) {
    await RedisDAO.createRaidInfo(level);
  }

  //레이드 정보 가져오기
  const raidInfo = await RedisDAO.getRaidInfo(level);

  const bossRaidLimitSeconds = raidInfo.bossRaidLimitSeconds;
  const score = raidInfo.score;

  //레디스 레이드 상태변경
  await RedisDAO.updateRaidSatusByEnter(userId, score);

  const enterTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const endTime = moment().add(bossRaidLimitSeconds, "seconds").format("YYYY-MM-DD HH:mm:ss");
  const recode = { userId: userId, score: 0, enterTime: enterTime, endTime: endTime };

  //Recode 생성
  const recodeEntity = await RecodeDAO.createRecode(recode);
  const raidRecordId = recodeEntity.dataValues.id;

  return { raidRecordId };
}

async function getRaidRecode(userId, raidRecordId) {
  const recode = await RecodeDAO.getRecodeForEnd(userId, raidRecordId);
  if (recode == null) {
    throw new BadRequestError("해당 레이드가 존재하지않습니다.");
  }
  return recode;
}

async function endRaid(recode) {
  //시간안에 깻는가?
  const restTime = moment(recode.endTime).diff();
  if (restTime > 0) {
    //점수기록
    recode.endTime = moment().format("YYYY-MM-DD HH:mm:ss");
    recode.score = await RedisDAO.getScore();
    await RecodeDAO.updateRecode(recode);
    await UserDAO.updateTotalScore(recode.userId, recode.score);
    //total점수 올리기
  }

  //보스레이드 상태변경
  await RedisDAO.updateRaidSatusByEnd();
}

//랭킹리스트 조회
async function getTopRankList() {
  const rowTopRankerList = await RedisDAO.getTopRankList();
  const TopRankerList = rowTopRankerList.reverse().map((obj, index) => {
    return new RankingInfo(index + 1, obj.value, obj.score);
  });
  return TopRankerList;
}

module.exports = {
  getRaidStatus,
  enterRaid,
  getRaidRecode,
  endRaid,
  getTopRankList,
};
