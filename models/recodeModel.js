const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Recode = sequelize.define(
    "Recode",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      enterTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Recode.associate = (models) => {
    Recode.belongsTo(models.User, { foreignKey: { name: "userId", allowNull: false } });
  };

  return Recode;
};
