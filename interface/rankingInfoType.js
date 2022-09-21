class RankingInfo {
  constructor(ranking, userId, totalScore) {
    this.ranking = Number(ranking);
    this.userId = Number(userId);
    this.totalScore = Number(totalScore);
  }
}

module.exports = { RankingInfo };
