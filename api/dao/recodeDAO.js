const { recodeModel } = require("../../models");

async function getRecodeByUserId(userId) {
  try {
    return await recodeModel.findAll({
      where: { userId: userId },
      attributes: [["id", "raidRecordId"], "score", "enterTime", "endTime"],
    });
  } catch (error) {
    throw new Error("getRecodeByUserId 에러");
  }
}

async function createRecode(recodeVO) {
  try {
    return await recodeModel.create(recodeVO);
  } catch (error) {
    console.error(error);
    throw new Error("createRecode 에러");
  }
}

module.exports = { getRecodeByUserId, createRecode };
