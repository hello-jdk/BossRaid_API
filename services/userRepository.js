const { userModel } = require("../models");

async function createUser() {
  try {
    return await userModel.create();
  } catch (error) {
    throw new Error("createUser 에러");
  }
}

async function getUserById(userId) {
  try {
    return await userModel.findByPk(userId, { raw: true });
  } catch (error) {
    throw new Error("getUserById 에러");
  }
}
module.exports = { createUser, getUserById };
