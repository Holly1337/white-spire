const express = require('express');
const router = express.Router();
const models = require('../../../models');
const Sequelize = require('sequelize')

const Op = Sequelize.Op

const HOURS_IN_A_YEAR = 24 * 7 * 52
const MS_IN_A_DAY = 1000 * 60 * 60 * 12

router.get('/leaderboard', (req, res) => {
  const now = Date.now()
  const twoDaysAgo = now - (MS_IN_A_DAY * 2)
  models.RankEntry.findAll({
    where: {
      timestamp: {
        [Op.gte]: twoDaysAgo
      }
    },
    order: [['timestamp', 'DESC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
})

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
