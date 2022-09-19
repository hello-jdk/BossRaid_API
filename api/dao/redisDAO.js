const axios = require("axios").default;
const { redis } = require("../../models");
const URL = "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";

async function checkRaidStatus() {
  const canEnter = await redis.hGet(URL, "canEnter");

  if (canEnter == null) {
    await redis.hSet(URL, "canEnter", 1);
  }

  return canEnter;
}

async function getEnteredUserId() {
  return await redis.hGet(URL, "enteredUserId");
}

async function checkRaidInfo(level) {
  const limitTimeExist = await redis.hExists(URL, "bossRaidLimitSeconds");
  const levelExist = await redis.hExists(URL, level);

  if (!limitTimeExist || !levelExist) {
    return false;
  } else {
    return true;
  }
}

async function createRaidInfo(level) {
  axios.get(URL).then((res) => {
    const bossDatum = res.data.bossRaids[0];

    const newBossRaidLimitSeconds = bossDatum.bossRaidLimitSeconds;
    const newScore = bossDatum.levels.find((arr) => arr.level == level).score;

    redis.hSet(URL, "bossRaidLimitSeconds", newBossRaidLimitSeconds);
    redis.hSet(URL, level, newScore);
  });
}

async function getRaidInfo(level) {
  let raidInfo = {};

  raidInfo.bossRaidLimitSeconds = await redis.hGet(URL, "bossRaidLimitSeconds");
  raidInfo.score = await redis.hGet(URL, level);

  return raidInfo;
}

async function updateRaidSatusByEnter(userId, score) {
  await redis.hSet(URL, "canEnter", 0);
  await redis.hSet(URL, "enteredUserId", userId);
  await redis.hSet(URL, "score", score);
}

async function updateRaidSatusByEnd() {
  await redis.hSet(URL, "canEnter", 1);
  await redis.hDel(URL, "enteredUserId");
  await redis.hDel(URL, "score");
}

async function getScore() {
  return await redis.hGet(URL, "score");
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
};
