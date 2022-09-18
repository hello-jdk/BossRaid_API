const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      totalScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: false,
      freezeTableName: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Recode, {
      foreignKey: { name: "userId", allowNull: false },
      sourceKey: "id",
    });
  };

  return User;
};
