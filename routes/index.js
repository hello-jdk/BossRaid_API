const router = require("express").Router();

const userController = require("../api/controller/userController");
const bossRaidController = require("../api/controller/bossRaidController");
const topRankerListController = {};

//user
router.post("/user", userController.createUser);
router.get("/user/:userId", userController.getUser);

//bossRaid
router.get("/bossRaid", bossRaidController.getRaidStatus);
router.post("/bossRaid/enter", bossRaidController.enterRaid);
router.patch("/bossRaid/end", bossRaidController.endRaid);

//topRankerList
//ledis /bossRaid/topRankerList

module.exports = { router };
