const models = require('../models');

const getNewestTimestamp = async (limit = 1) => {
  const response = await models.RankEntry.findAll({
    attributes: ['timestamp'],
    group: ['timestamp'],
    order: [['timestamp', 'DESC']],
    limit
  })
  return response.map(
    entry => entry.timestamp
  )
}

module.exports = {
  getNewestTimestamp
}

