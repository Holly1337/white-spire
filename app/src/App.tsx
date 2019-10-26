import React, { useEffect, useState } from 'react'
import Table from './Components/Table/Table'
import LastUpdated from './Components/LastUpdated'
import DataLoadingIndicator from './Components/DataLoadingIndicator'
import Header from './Components/Layout/Header'
import SiteWrapper from './Components/Layout/SiteWrapper'
import DataInfoFooter from './Components/Layout/DataInfoFooter'

const rankChange = (player: Rank, leaderboard: LeaderboardData): RankChange => {
  if (leaderboard.length <= 1) {
    return 0
  }
  const lastEntry: LeaderboardEntry = leaderboard[1]
  const lastPlayerEntry: Rank | undefined = lastEntry.ranks.find(
    (entry: Rank) => player.playerName === entry.playerName
  )
  if (typeof lastPlayerEntry === 'undefined') {
    return 'new'
  }
  return lastPlayerEntry.rank - player.rank
}

const buildPlayerHistory = (leaderboard: LeaderboardData): PlayerHistory => {
  const playerHistory: PlayerHistory = {}
  leaderboard.forEach(entry => {
    entry.ranks.forEach(rank => {
      if (!Array.isArray(playerHistory[rank.playerName])) {
        playerHistory[rank.playerName] = []
      }
      playerHistory[rank.playerName].push(rank.rank)
    })
  })
  return playerHistory
}

// quick fix to turn the new api response into the old format. Will be removed later
const prepareData = (json: object[]): LeaderboardData => {
  const byDate: { [key: string]: Ranks } = {}

  json.forEach((data: any) => {
    const timestamp: string = data.timestamp as string
    const seconds = new Date(timestamp).getTime()
    const newData: Rank = {
      playerName: data.playername,
      rank: data.position,
      score: data.score
    }
    if (!Array.isArray(byDate[seconds])) {
      byDate[seconds] = []
    }
    byDate[seconds].push(newData)
  })

  const leaderboard: LeaderboardData = Object.entries(byDate).map(
    ([timestamp, ranks]: [string, Ranks]): LeaderboardEntry => {
      ranks.sort((rank1, rank2) => rank1.rank - rank2.rank)
      return {
        id: parseInt(timestamp, 10),
        ranks
      }
    }
  )

  leaderboard.sort((entry1, entry2) => entry2.id - entry1.id)

  return leaderboard
}

const App: React.FC = () => {
  const [ranks, setRanks] = useState<Ranks | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>([])

  useEffect(() => {
    fetch('/api/v1/leaderboard')
      .then(res => res.json())
      .then(prepareData)
      .then((data: LeaderboardData) => {
        if (data.length === 0) {
          setRanks([])
          return
        }
        setLeaderboard(data)
        setRanks(data[0].ranks)
      })
  }, [])

  if (ranks === null) {
    return (
      <SiteWrapper>
        <Header/>
        <DataLoadingIndicator />
      </SiteWrapper>
    )
  }

  const players: PlayerData[] = ranks.map(rank => {
    return {
      ...rank,
      rankChange: rankChange(rank, leaderboard)
    }
  })

  const playerHistory = buildPlayerHistory(leaderboard)
  let lastUpdated
  if (leaderboard.length === 0) {
    lastUpdated = new Date()
  } else {
    const epoch = leaderboard[0].id
    lastUpdated = new Date(epoch)
  }

  return (
    <SiteWrapper>
      <Header />
      <div style={{ width: '100%' }}>
        <LastUpdated date={lastUpdated} />
      </div>
      <Table players={players} playerHistory={playerHistory} leaderboardData={leaderboard} />
      <DataInfoFooter />
    </SiteWrapper>
  )
}

export default App
