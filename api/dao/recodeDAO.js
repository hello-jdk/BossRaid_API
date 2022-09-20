const { recodeModel } = require("../../models");

async function getRecodeByUserId(userId) {
  try {
    return await recodeModel.findAll({
      where: { userId: userId },
      attributes: [["id", "raidRecordId"], "score", "enterTime", "endTime"],
      raw: true,
    });
  } catch (error) {
    throw new Error("getRecodeByUserId 에러");
  }
}

async function createRecode(recode) {
  try {
    return await recodeModel.create(recode);
  } catch (error) {
    throw new Error("createRecode 에러");
  }
}

async function updateRecode(recode) {
  try {
    return await recodeModel.update(recode, { where: { id: recode.id } });
  } catch (error) {
    console.error(error);
    throw new Error("updateRecode 에러");
  }
}

async function getRecodeForEnd(userId, raidRecordId) {
  try {
    return await recodeModel.findOne({ where: { userId, id: raidRecordId }, raw: true });
  } catch (error) {
    throw new Error("getRecodeForEnd 에러");
  }
}

module.exports = {
  getRecodeByUserId,
  createRecode,
  updateRecode,
  getRecodeForEnd,
};
