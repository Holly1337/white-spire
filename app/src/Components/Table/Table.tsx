import React from 'react'
import TableRow from './TableRow/TableRow'

interface Props {
  players: PlayerData[]
  playerHistory: PlayerHistory
  leaderboardData: LeaderboardData
}

const Table = (props: Props) => {
  const { players } = props
  if (players.length === 0) {
    return <h1 className='text-center'>No data yet :(</h1>
  }

  return (
    <>
      <div className='table'>
        <div className='thead'>
          <div className='tr'>
            <div className='th rank-column'>Rank</div>
            <div className='th name-column'>Name</div>
            <div className='th score-column'>Score</div>
            <div className='th history-column'>History</div>
          </div>
        </div>
        <div className='tbody'>
          {
            players.map(
              (player, index: number) => {
                // const rankHistory = props.playerHistory[player.playerName]
                return <TableRow key={index} {...player} leaderboardData={props.leaderboardData} />
              }
            )
          }
        </div>
      </div>
    </>
  )
}

export default Table
