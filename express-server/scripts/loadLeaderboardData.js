const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const models = require("../models")

const saveToDb = (entries) => {
  entries.forEach(entry => {
    entry
      .save()
      .then(() => { console.log('saved entry') })
      .catch((err) => { console.log('error saving entry:', err) })
  })
}

const processHtml = (html) => {
  const dom = new JSDOM(html);
  const ranks = dom.window.document.querySelectorAll('#LeaderboardTable .row')
  const timestamp = Date.now()

  if (ranks.length === 0) {
    console.log('there were no entries to save')
    return
  }

  let entries = (Array.from(ranks)).map(
    (rankElement) => {
      const position = parseInt(rankElement.querySelector('.rank').textContent, 10)
      const playername = rankElement.querySelector('.player').textContent
      const score = parseInt(rankElement.querySelector('.rankscore').textContent, 10)

      const entry = models.RankEntry.build({
          timestamp: timestamp,
          playername,
          position,
          score
        }
      )
      return entry
    }
  )

  saveToDb(entries)
}

fetch('https://underlords.com/leaderboard')
  .then(response => response.text())
  .then(processHtml)
