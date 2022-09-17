const router = require("express").Router();

const userController = {};
const bossRaidController = {};
const topRankerListController = {};

//user
router.post("/user", userController);
router.get("/user/:userId", userController);

//bossRaid
router.get("/bossRaid", bossRaidController);
router.post("/bossRaid/enter", bossRaidController);
router.patch("/bossRaid/end", bossRaidController);

//topRankerList
//ledis /bossRaid/topRankerList

module.exports = router;
