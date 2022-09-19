const axios = require("axios").default;
const { redis } = require("../models");

async function checkStaticCache(req, res, next) {
  const URL = "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";
  const userLevel = req.body.level;

  const bossRaidLimitSeconds = await redis.hGet(URL, "bossRaidLimitSeconds");
  const score = await redis.hGet(URL, userLevel);

  if (score == null || bossRaidLimitSeconds == null) {
    await axios.get(URL).then((res) => {
      const bossDatum = res.data.bossRaids[0];

      const newBossRaidLimitSeconds = bossDatum.bossRaidLimitSeconds;
      const newScore = bossDatum.levels.find((arr) => arr.level == userLevel).score;

      redis.hSet(URL, "bossRaidLimitSeconds", newBossRaidLimitSeconds);
      redis.hSet(URL, userLevel, newScore);

      req.body.bossRaidLimitSeconds = newBossRaidLimitSeconds;
      req.body.score = newScore;
    });
  } else {
    req.body.bossRaidLimitSeconds = bossRaidLimitSeconds;
    req.body.score = score;
  }

  next();
}

module.exports = { checkStaticCache };
