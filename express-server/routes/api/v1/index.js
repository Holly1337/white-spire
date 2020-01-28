const { generateFullLeaderboard } =  require('../../../lib/generateFullLeaderboard')

const { getStringDate } = require('../../../lib/format')
const { getNewestTimestamps } = require('../../../lib/queries')

const express = require('express');
const router = express.Router();
const models = require('../../../models');
const Sequelize = require('sequelize')
const moment = require('moment')

const Op = Sequelize.Op

const HOURS_IN_A_YEAR = 24 * 7 * 52
const MS_IN_A_DAY = 1000 * 60 * 60 * 12
const MAX_LEADERBOARD_LIMIT = 48

/**
 * returns all entries for the latest timestamp and ads timeInLord and positionChange
 */
router.get('/fullLeaderboard', async (req, res) => {
  let [current, previous] = await getNewestTimestamps(2)

  const currentLeaderboard = await models.RankEntry.findAll({
    where: { timestamp: current },
    order: [['position', 'ASC']],
  })

  const previousLeaderboard = await models.RankEntry.findAll({
    where: { timestamp: previous },
    order: [['position', 'ASC']],
  })

  const fullLeaderboard = generateFullLeaderboard(currentLeaderboard, previousLeaderboard)
  res.setHeader('Content-Type', 'application/json')
  res.json(fullLeaderboard)
})

/**
 * returns all entries for the latest timestamp. Ordered by position
 */
router.get('/leaderboard', async (req, res) => {
  const [timestamp] = await getNewestTimestamps(1)
  models.RankEntry.findAll({
    where: { timestamp },
    order: [['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

/**
 * returns all entries for the given exact timestamp. Ordered by position
 * :timestamp - 'YYYY-MM-DD HH:mm:ss'
 */
router.get('/leaderboard/:timestamp', async (req, res, next) => {
  const timestampParam = req.params.timestamp
  const timestamp = moment(timestampParam, 'YYYY-MM-DD HH:mm:ss', true)
  if (!timestamp.isValid()) {
    res.json({ error: 'Invalid timestamp format. Must be YYYY-MM-DD HH:mm:ss'})
    return
  }

  models.RankEntry.findAll({
    where: { timestamp },
    order: [['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

/**
 * returns all entries for the given date and hour. Ordered by timestamp DESC; position ASC
 * :date - YYYY-MM-DD
 * :hour - HH
 */
router.get('/leaderboard/:date/:hour(\\d+)', async (req, res) => {
  const dateParam = req.params.date
  const hourParam = req.params.hour
  const intHour = parseInt(hourParam)

  const date = moment(dateParam, 'YYYY-MM-DD', true)
  if (!date.isValid()) {
    res.json({ error: 'Invalid date format. Must be YYYY-MM-DD' })
    return
  }

  if (intHour < 0 || intHour > 23) {
    res.json({ error: 'hour must be between 0 and 23'})
    return
  }

  const from = `${dateParam} ${intHour}:00:00`
  const to = `${dateParam} ${intHour + 1}:00:00`

  models.RankEntry.findAll({
    where: { timestamp: { [Op.between]: [from, to] } },
    order: [['timestamp', 'DESC'], ['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

/**
 * returns all entries for the latest n timestamps. Ordered by timestamp DESC; position ASC
 * :amount - integer
 */
router.get('/leaderboards/:amount(\\d+)', async (req, res) => {
  let amount = parseInt(req.params.amount, 10)
  if (isNaN(amount)) amount = 1 // Just to be safe. Should be protected by express
  amount = Math.max(amount, 1)
  const timestamps = await getNewestTimestamps(amount)

  models.RankEntry.findAll({
    where: { timestamp: { [Op.or]: timestamps } },
    order: [['timestamp', 'DESC'], ['position', 'ASC'] ],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

/**
 * returns all entries for the given date. Ordered by position
 * :date - 'YYYY-MM-DD'
 */
router.get('/leaderboards/:date', async (req, res, next) => {
  const dateParam = req.params.date
  const date = moment(dateParam, 'YYYY-MM-DD', true)
  if (!date.isValid()) {
    res.json({ error: 'Invalid date format. Must be YYYY-MM-DD' })
    return
  }

  const from = `${dateParam} 00:00:00`
  const to = `${dateParam} 23:59:59`

  models.RankEntry.findAll({
    where: { timestamp: { [Op.between]: [from, to] } },
    order: [['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

/**
 * returns a list of all players and how long (in hours) they have been a lord. Ordered by time.
 */
router.get('/timeInLord', async (req, res) => {
  models.RankEntry.findAll({
    group: ['playername'],
    attributes: ['playername', [Sequelize.fn('COUNT', 'playername'), 'time']],
    order: [[Sequelize.col('time'), 'DESC']]
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
