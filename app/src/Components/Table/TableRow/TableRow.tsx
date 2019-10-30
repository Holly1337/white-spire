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
      <div className='tr'>
        <span className='rank-column'>
          <RankChangeIndicator rank={rank} change={rankChange} />
        </span>
        <span className='name-column'>
          <PlayerName playerName={playerName} />
        </span>
        <span className='score-column'>
          {1337}
        </span>
        <span className='history-column'>
            <button
              className='button-history'
              onClick={toggleHistory}
            >
              {
                showHistory
                  ? <i className='fas fa-chart-line fa-rotate-180' />
                  : <i className='fas fa-chart-line' />
              }
            </button>
        </span>
      </div>
      {
        showHistory && <RankHistory playerName={playerName} leaderboardData={leaderboardData} />
      }
    </>
  )
}

export default TableRow
