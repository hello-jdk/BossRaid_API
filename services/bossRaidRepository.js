const { recodeModel } = require("../models");

async function getRecodeByUserId(userId) {
  try {
    return await recodeModel.findAll({
      where: { userId: userId },
      attributes: { exclude: userId },
    });
  } catch (error) {
    throw new Error("getRecodeByUserId 에러");
  }
}

module.exports = { getRecodeByUserId };
