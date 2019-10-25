import RankChangeIndicator from '../RankChangeIndicator'
import PlayerName from '../PlayerName'
import React, { useState } from 'react'
import RankHistory from './RankHistory'

interface TableRowProps extends PlayerData {
  leaderboardData: LeaderboardData
}

const TableRow = ({ rank, rankChange, playerName, leaderboardData }: TableRowProps) => {
  const [showHistory, setShowHistory] = useState(false)
  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }
  return (
    <>
      <div className='tr' style={{ display: 'flex' }}>
        <span className='player-rank'>
          <RankChangeIndicator change={rankChange} />
          <span style={{ marginLeft: 5 }}>
            {rank}
          </span>
        </span>
        <span className='player-name' style={{ width: '100%' }}>
          <PlayerName playerName={playerName} />
          <span style={{ float: 'right' }}>
            <button
              className='button-history'
              style={{ cursor: 'pointer' }}
              onClick={toggleHistory}
            >
              {
                showHistory
                  ? <i className='fas fa-chart-line fa-rotate-180' />
                  : <i className='fas fa-chart-line' />
              }
            </button>
          </span>
        </span>
      </div>
      {
        showHistory && <RankHistory playerName={playerName} leaderboardData={leaderboardData} />
      }
    </>
  )
}

export default TableRow
