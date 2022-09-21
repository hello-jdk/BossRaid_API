const router = require("express").Router();

const userController = require("../api/controller/userController");
const bossRaidController = require("../api/controller/bossRaidController");

//user
router.post("/user", userController.createUser);
router.get("/user/:userId", userController.getUser);

//bossRaid
router.get("/bossRaid", bossRaidController.getRaidStatus);
router.post("/bossRaid/enter", bossRaidController.enterRaid);
router.patch("/bossRaid/end", bossRaidController.endRaid);

//topRankerList
router.post("/bossRaid/topRankerList", bossRaidController.getRankerList);

module.exports = { router };
