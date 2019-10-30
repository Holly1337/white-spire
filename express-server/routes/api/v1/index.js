const { getNewestTimestamp } = require('../../../lib/queries')

const express = require('express');
const router = express.Router();
const models = require('../../../models');
const Sequelize = require('sequelize')

const Op = Sequelize.Op

const HOURS_IN_A_YEAR = 24 * 7 * 52
const MS_IN_A_DAY = 1000 * 60 * 60 * 12
const MAX_LEADERBOARD_LIMIT = 48

/**
 * allows to get the latest leaderboard data
 * parameter ?limit=[number] allows to get the last x leaderboards, up to 48
 */
router.get('/leaderboard', async (req, res) => {
  let limit = parseInt(req.query.limit, 10)
  if (isNaN(limit)) limit = 1
  limit = Math.min(limit, MAX_LEADERBOARD_LIMIT)
  limit = Math.max(limit, 1)

  const timestamps = await getNewestTimestamp(limit)
  models.RankEntry.findAll({
    where: { timestamp: { [Op.or]: timestamps } },
    order: [['timestamp', 'DESC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

/**
 * gets all RankEntries for a player. Up to 1 year old
 */
router.get('/player/:name', (req, res) => {
  const playername = req.params.name
  models.RankEntry.findAndCountAll({
    where: { playername },
    limit: HOURS_IN_A_YEAR,
    order: [['timestamp', 'DESC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

router.get('/position/:position', (req, res) => {
  const position = req.params.position
  models.RankEntry.findAll({
    where: { position },
    limit: HOURS_IN_A_YEAR,
    order: [['timestamp', 'DESC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

module.exports = router;
