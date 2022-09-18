const router = require("express").Router();

const userController = require("../controller/userController");
const bossRaidController = require("../controller/bossRaidController");
const topRankerListController = {};

//user
router.post("/user", userController.createUser);
router.get("/user/:userId", userController.getUser);

//bossRaid
// router.get("/bossRaid", bossRaidController);
// router.post("/bossRaid/enter", bossRaidController);
// router.patch("/bossRaid/end", bossRaidController);

//topRankerList
//ledis /bossRaid/topRankerList

module.exports = router;

//각 API의 라우팅 및 유효성검사를 진행합니다.
