const { StatusCodes } = require("http-status-codes");
const BossRaidService = require("../services/bossRaidService");

async function getRaidStatus(req, res, next) {
  try {
    const raidStatus = await BossRaidService.getRaidStatus();

    const canEnter = raidStatus.canEnter;
    const enteredUserId = raidStatus.enteredUserId;

    if (canEnter) {
      return res.status(StatusCodes.OK).send({ canEnter: true });
    } else {
      return res.status(StatusCodes.OK).send({ canEnter: false, enteredUserId: enteredUserId });
    }
  } catch (error) {
    next(error);
  }
}

async function enterRaid(req, res, next) {
  const { userId, level } = req.body;

  try {
    //레이드 입장가능 여부
    const raidStatus = await BossRaidService.getRaidStatus();
    const canEnter = raidStatus.canEnter;

    if (!canEnter) {
      return res.status(StatusCodes.OK).send({ isEntered: false });
    }

    //레이드 입장
    const { raidRecordId } = await BossRaidService.enterRaid(userId, level);
    return res.status(StatusCodes.OK).send({ isEntered: true, raidRecordId: raidRecordId });
  } catch (error) {
    next(error);
  }
}

module.exports = { getRaidStatus, enterRaid };
