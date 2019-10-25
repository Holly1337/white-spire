'use strict';
module.exports = (sequelize, DataTypes) => {
  const RankEntry = sequelize.define('RankEntry', {
    timestamp: DataTypes.DATE,
    playername: DataTypes.STRING,
    position: Sequelize.INTEGER,
    score: Sequelize.INTEGER
  }, {});
  RankEntry.associate = function (models) {
    // associations can be defined here
  };
  return RankEntry;
};
