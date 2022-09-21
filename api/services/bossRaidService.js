const moment = require("moment");
const { BadRequestError } = require("../../interface/errorType");
const UserDAO = require("../dao/userDAO");
const RecodeDAO = require("../dao/recodeDAO");
const RedisDAO = require("../dao/redisDAO");
const { RankingInfo } = require("../../interface/rankingInfoType");

//레이드 입장가능여부 조회
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

//레이드 입장
async function enterRaid(userId, level) {
  //레이드 정보 확인
  const infoExist = await RedisDAO.checkRaidInfo(level);

  if (!infoExist) {
    await RedisDAO.createRaidInfo(level);
  }

  //레이드 정보 가져오기
  const raidInfo = await RedisDAO.getRaidInfo(level);

  //데이터 가공
  const bossRaidLimitSeconds = raidInfo.bossRaidLimitSeconds;
  const score = raidInfo.score;

  //레디스 레이드 상태변경
  await RedisDAO.updateRaidSatusByEnter(userId, score);

  //데이터 가공
  const enterTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const endTime = moment().add(bossRaidLimitSeconds, "seconds").format("YYYY-MM-DD HH:mm:ss");
  const recode = { userId: userId, score: 0, enterTime: enterTime, endTime: endTime };

  //Recode 생성
  const recodeEntity = await RecodeDAO.createRecode(recode);
  const raidRecordId = recodeEntity.dataValues.id;

  return { raidRecordId };
}

//해당 레이드 진행 존재 여부
async function getRaidRecode(userId, raidRecordId) {
  const recode = await RecodeDAO.getRecodeForEnd(userId, raidRecordId);
  if (recode == null) {
    throw new BadRequestError("해당 레이드가 존재하지않습니다.");
  }
  return recode;
}

//레이드 퇴장
async function endRaid(recode) {
  //보스레이드 상태변경
  await RedisDAO.updateRaidSatusByEnd();

  //남은 시간 계산
  const restTime = moment(recode.endTime).diff();
  if (restTime > 0) {
    //점수기록
    recode.endTime = moment().format("YYYY-MM-DD HH:mm:ss");
    recode.score = await RedisDAO.getScore();

    ////업데이트
    //히스토리 갱신
    await RecodeDAO.updateRecode(recode);
    //유저 통합점수 갱신
    const updatedUser = await UserDAO.updateTotalScore(recode.userId, recode.score);
    //랭킹 갱신
    await RedisDAO.updateTotalScore(updatedUser);
  }
}

//랭킹 조회
async function getTopRankList() {
  const rawTopRankerList = await RedisDAO.getTopRankList();
  const TopRankerList = rawTopRankerList.reverse().map((obj, index) => {
    return new RankingInfo(index + 1, obj.value, obj.score);
  });
  return TopRankerList;
}

//내 랭킹 조회
async function getMyRankingInfo(userId) {
  const rawMyRankingInfo = await RedisDAO.getMyRankingInfo(userId);
  const myRankingInfo = new RankingInfo(rawMyRankingInfo[0] + 1, userId, rawMyRankingInfo[1]);
  return myRankingInfo;
}

module.exports = {
  getRaidStatus,
  enterRaid,
  getRaidRecode,
  endRaid,
  getTopRankList,
  getMyRankingInfo,
};
