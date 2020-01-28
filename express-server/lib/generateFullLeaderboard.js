const generateFullLeaderboard = (current, previous) => {
  const previousByPlayerName = new Map()
  previous.forEach(
    entry => {
      previousByPlayerName.set(entry.playername, entry)
    }
  )

  const fullLeaderboard = current.map(
    entry => {
      let positionChange = null
      const previousEntry = previousByPlayerName.get(entry.playername)
      if (typeof previousEntry !== 'undefined') {
        positionChange = previousEntry.position - entry.position
      }

      return {
        ...entry.dataValues,
        timeInLord: 0,
        positionChange
      }
    }
  )

  return fullLeaderboard
}

module.exports = {
  generateFullLeaderboard
}
