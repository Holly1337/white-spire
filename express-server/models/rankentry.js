'use strict';
module.exports = (sequelize, DataTypes) => {
  const RankEntry = sequelize.define('RankEntry', {
    timestamp: DataTypes.DATE,
    playername: DataTypes.STRING,
    position: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  RankEntry.associate = function(models) {
    // associations can be defined here
  };
  return RankEntry;
};
