const axios = require("axios").default;
const { redis } = require("../../models");
const URL = "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";

//레이드상태 확인
async function checkRaidStatus() {
  const canEnter = await redis.hGet(URL, "canEnter");

  if (canEnter == null) {
    await redis.hSet(URL, "canEnter", 1);
  }

  return canEnter;
}

//레이드에 입장한 유저조회
async function getEnteredUserId() {
  return await redis.hGet(URL, "enteredUserId");
}

//레이드정보가 존재하는가
async function checkRaidInfo(level) {
  const limitTimeExist = await redis.hExists(URL, "bossRaidLimitSeconds");
  const levelExist = await redis.hExists(URL, level);

  if (!limitTimeExist || !levelExist) {
    return false;
  } else {
    return true;
  }
}

//레이드정보를 생성
async function createRaidInfo(level) {
  axios.get(URL).then((res) => {
    const bossDatum = res.data.bossRaids[0];

    const newBossRaidLimitSeconds = bossDatum.bossRaidLimitSeconds;
    const newScore = bossDatum.levels.find((arr) => arr.level == level).score;

    redis.hSet(URL, "bossRaidLimitSeconds", newBossRaidLimitSeconds);
    redis.hSet(URL, level, newScore);
  });
}

//레이드정보를 조회
async function getRaidInfo(level) {
  let raidInfo = {};

  raidInfo.bossRaidLimitSeconds = await redis.hGet(URL, "bossRaidLimitSeconds");
  raidInfo.score = await redis.hGet(URL, level);

  return raidInfo;
}

//레이드정보 점수만 조회
async function getScore() {
  return await redis.hGet(URL, "score");
}

//레이드상태변경 (입장시)
async function updateRaidSatusByEnter(userId, score) {
  await redis.hSet(URL, "canEnter", 0);
  await redis.hSet(URL, "enteredUserId", userId);
  await redis.hSet(URL, "score", score);
}

//레이드상태변경 (퇴장시)
async function updateRaidSatusByEnd() {
  await redis.hSet(URL, "canEnter", 1);
  await redis.hDel(URL, "enteredUserId");
  await redis.hDel(URL, "score");
}

//랭킹 생성
async function createRank(userId) {
  userId = String(userId); //삭제하면안됨
  return await redis.ZADD("leaderboard", { value: userId, score: 0 });
}

//랭킹 전체 조회
async function getTopRankList() {
  return await redis.zRangeWithScores("leaderboard", 0, -1);
}

module.exports = {
  checkRaidStatus,
  getEnteredUserId,
  checkRaidInfo,
  createRaidInfo,
  getRaidInfo,
  updateRaidSatusByEnter,
  updateRaidSatusByEnd,
  getScore,
  createRank,
  getTopRankList,
};
