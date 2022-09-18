const BossRaidRepository = require("./bossRaidRepository");

async function getUserRecode(userId) {
  const userRecodes = await BossRaidRepository.getRecodeByUserId(userId);
  return userRecodes;
}

module.exports = { getUserRecode };
