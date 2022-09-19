const moment = require("moment");
const { DataTypes } = require("sequelize");
const RecodeDAO = require("../dao/recodeDAO");
const RedisDAO = require("../dao/redisDAO");

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

  //레디스 레이드 상태변경
  await RedisDAO.updateRaidSatus(userId);

  //TODO: 리펙토링
  const bossRaidLimitSeconds = raidInfo.bossRaidLimitSeconds;
  const score = raidInfo.score;
  const enterTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const endTime = moment().add(bossRaidLimitSeconds, "seconds").format("YYYY-MM-DD HH:mm:ss");
  const recodeVO = { userId: userId, score: score, enterTime: enterTime, endTime: endTime };

  //Recode 생성
  const recodeEntity = await RecodeDAO.createRecode(recodeVO);
  const raidRecordId = recodeEntity.dataValues.id;

  return { raidRecordId };
}

module.exports = { getRaidStatus, enterRaid };
