const fetch = require('node-fetch')
const jsdom = require('jsdom')
const fs = require('fs')
const { JSDOM } = jsdom;

const writeToFile = (json) => {
  fs.writeFile("data/data.json", json, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

const appendToFile = (dataPoint) => {
  fs.readFile("data/data.json", (err ,data) => {
    let object = JSON.parse(data.toString())
    object[dataPoint.date] = dataPoint.ranks
    writeToFile(JSON.stringify(object))
  })
}

const saveToServer = (id, ranks) => {
  return fetch(`http://localhost:6112/leaderboard`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      id,
      ranks
    })
  }).then(res => {
    console.log('SUCCESSFULLY SAVED TO SERVER')
    console.log(res.json)
    return res.json();
  });
}

const processHtml = (html) => {
  // console.log(html)
  const dom = new JSDOM(html);
  const ranks = dom.window.document.querySelectorAll('#LeaderboardTable .row')
  const date = Date.now()

  let rankData = []
  ranks.forEach(
    (rankElement) => {
      const rank = parseInt(rankElement.querySelector('.rank').textContent, 10)
      const playerName = rankElement.querySelector('.player').textContent

      const data = {
        rank,
        playerName
      }
      rankData.push(data)
    }
  )

  rankData = rankData.sort((a, b) => {
    return a.rank - b.rank
  })

  // const dataPoint = {
  //   date,
  //   ranks: rankData
  // }

  saveToServer(date, rankData)
  // appendToFile(dataPoint)
}


fetch('https://underlords.com/leaderboard')
  .then(response => response.text())
  .then(processHtml)
