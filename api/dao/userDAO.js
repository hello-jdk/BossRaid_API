const { userModel, sequelize } = require("../../models");

//유저생성
async function createUser() {
  try {
    return await userModel.create();
  } catch (error) {
    throw new Error("createUser 에러");
  }
}

//유저조회 (id)
async function getUserById(userId) {
  try {
    return await userModel.findByPk(userId, { raw: true });
  } catch (error) {
    throw new Error("getUserById 에러");
  }
}

//유저수정 (전체점수)
async function updateTotalScore(userId, score) {
  const t = await sequelize.transaction();
  try {
    const user = await userModel.findByPk(userId, { raw: true, transaction: t });
    user.totalScore = Number(user.totalScore) + Number(score);
    await userModel.update(user, { where: { id: userId }, transaction: t });
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new Error("updateTotalScore 에러");
  }
}
module.exports = {
  createUser,
  getUserById,
  updateTotalScore,
};
