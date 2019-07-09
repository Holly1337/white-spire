import React, { useEffect, useState } from 'react'
import Table from './Components/Table/Table'
import LastUpdated from './Components/LastUpdated'

interface Rank {
  rank: number,
  playerName: string
}

type Ranks = Rank[]

interface LeaderboardEntry {
  id: number,
  ranks: Ranks
}

type LeaderboardData = LeaderboardEntry[]

export type RankChange = number | 'new'

export interface PlayerData extends Rank {
  rankChange: RankChange
}

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

export interface PlayerHistory {
  [id: string]: number[]
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

const App: React.FC = () => {
  const [ranks, setRanks] = useState<Ranks>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>([])

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then((data: LeaderboardData) => {
        if (data.length === 0) {
          return
        }
        data = data.reverse()
        setLeaderboard(data)
        setRanks(data[0].ranks)
      })
  }, [])

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
    <div className='site-wrapper'>
      <div className='header'>
        <div className='main'>
          LORDS OF WHITE SPIRE
        </div>
        <div className='subtitle'>
          Dota Underlords Leaderboard History
        </div>
      </div>
      <LastUpdated date={lastUpdated}/>
      <Table players={players} playerHistory={playerHistory} />
      <div style={{ textAlign: 'center' }}>
        <small>
          Data is based on <a
          style={{
            color: 'white'
          }}
          href='https://underlords.com/leaderboard'
          target='_blank'
          rel='noopener noreferrer'
        >
          <strong>underlords.com/leaderboard</strong>
        </a>.
          Data is not accurate for duplicate playernames
        </small>
      </div>
    </div>
  );
}

export default App;
