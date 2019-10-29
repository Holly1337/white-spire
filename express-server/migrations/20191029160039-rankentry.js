'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('Convert charset to utf8mb4 and collate to utf8mb4_unicode_ci')
    return queryInterface.sequelize.query(
      `ALTER TABLE RankEntries
        CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    )
  },

  down: (queryInterface, Sequelize) => {}
};
