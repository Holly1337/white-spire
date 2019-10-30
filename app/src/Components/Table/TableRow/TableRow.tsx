import RankChangeIndicator from '../RankChangeIndicator'
import PlayerName from '../PlayerName'
import React, { useState } from 'react'
import RankHistory from './RankHistory'

interface TableRowProps {
  entry: RankEntry
  playerData: PlayerLeaderboardData
}

const TableRow: React.FC<TableRowProps> = ({ entry, playerData }) => {
  const { position: rank, playername } = entry
  const [isLoadingHistoryData, setIsLoadingHistoryData] = useState<boolean>(false)
  const [showHistory, setShowHistory] = useState(false)
  const [rankData, setRankData] = useState<RankData[] | null | undefined>(null)

  const loadRankData = async () => {
    try {
      const response = await fetch(`/api/v1/player/${playername}`)
      const json: PlayerDataResponse = await response.json()
      const data: RankEntry[] = json.rows
      const responseRankData: RankData[] = data.map(rankEntry => ({
        date: new Date(rankEntry.timestamp).getTime(),
        rank: rankEntry.position
      }))
      setRankData(responseRankData)
    } catch (e) {
      setRankData(undefined)
    }
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  const onHistoryButtonClick = async () => {
    const show = showHistory
    toggleHistory()
    if (rankData === null && !isLoadingHistoryData && !show) {
      setIsLoadingHistoryData(true)
      await loadRankData()
      setIsLoadingHistoryData(false)
    }
  }

  const { current, previous } = playerData
  let rankChange: RankChange = 'new'
  if (typeof previous !== 'undefined') {
    rankChange = previous.position - current.position
  }

  let rankHistory = null
  if (showHistory) {
    if (rankData === null) {
      rankHistory = <div>Loading data <i className='fa fa-spinner fa-spin' /></div>
    } else if (typeof rankData === 'undefined') {
      rankHistory = <div>There was an error loading the history data :(</div>
    } else {
      rankHistory = <RankHistory data={rankData} />
    }
  }

  return (
    <>
      <div className='tr'>
        <span className='rank-column'>
          <RankChangeIndicator rank={rank} change={rankChange} />
        </span>
        <span className='name-column'>
          <PlayerName playerName={playername} />
        </span>
        <span className='score-column'>
          {entry.position}
        </span>
        <span className='history-column'>
            <button
              className='button-history'
              onClick={onHistoryButtonClick}
            >
              {
                showHistory
                  ? <i className='fas fa-chart-line fa-rotate-180' />
                  : <i className='fas fa-chart-line' />
              }
            </button>
        </span>
      </div>
      {rankHistory}
    </>
  )
}

export default TableRow
