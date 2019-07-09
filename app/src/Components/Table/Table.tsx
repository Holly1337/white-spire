import React from 'react'
import { PlayerData, PlayerHistory } from '../../App'
import RankChangeIndicator from './RankChangeIndicator'
import PlayerName from './PlayerName'

interface TableRowProps  extends PlayerData {
  rankHistory: number[]
}

const TableRow = ({ rank, rankChange, playerName, rankHistory }: TableRowProps) => {
  return (
    <tr>
      <td>
        <RankChangeIndicator change={rankChange} />
        <span style={{ marginLeft: 5 }}>
          {rank}
        </span>
      </td>
      <td>
        <PlayerName playerName={playerName} />
      </td>
      <td>{rankHistory.join(', ')}</td>
    </tr>
  )
}

interface Props {
  players: PlayerData[]
  playerHistory: PlayerHistory
}

const Table = (props: Props) => {
  const { players } = props
  if (players.length === 0) {
    return <h1 style={{textAlign: 'center'}}>Loading Data</h1>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Rank History</th>
        </tr>
      </thead>
      <tbody>
      {
        players.map(
          (player, index: number) => {
            const rankHistory = props.playerHistory[player.playerName]
            return <TableRow key={index} {...player} rankHistory={rankHistory} />
          }
        )
      }
      </tbody>
    </table>
  )
}

export default Table
