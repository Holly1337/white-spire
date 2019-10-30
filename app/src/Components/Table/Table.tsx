import React from 'react'
import TableRow from './TableRow/TableRow'

interface Props {
  entries: RankEntry[]
  playersData: PlayersData
}

const Table: React.FC<Props> = ({ entries, playersData }) => {
  if (entries.length === 0) {
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
            entries.map(
              (entry) => (
                <TableRow
                  key={entry.id}
                  entry={entry}
                  playerData={playersData[entry.playername]}
                />
              )
            )
          }
        </div>
      </div>
    </>
  )
}

export default Table
