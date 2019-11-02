import RankChangeIndicator from '../RankChangeIndicator'
import PlayerName from '../PlayerName'
import React, { useState } from 'react'
import RankHistory from './RankHistory'
import LoadingRankHistoryData from '../../Notifications/LoadingRankHistoryData'
import LoadingRankHistoryDataError from '../../Notifications/LoadingRankHistoryDataError'

interface TableRowProps {
  entry: FullLeaderboardEntry
}

const TableRow: React.FC<TableRowProps> = ({ entry }) => {
  const { position: rank, playername, score, positionChange: rankChange, timeInLord } = entry
  const [isLoadingHistoryData, setIsLoadingHistoryData] = useState<boolean>(false)
  const [showHistory, setShowHistory] = useState(false)
  const [rankData, setRankData] = useState<RankData[] | null | undefined>(null)

  const loadRankData = async () => {
    try {
      const encodedPlayerName = encodeURIComponent(playername)
      const response = await fetch(`/api/v1/player/${encodedPlayerName}`)
      const json: PlayerDataResponse = await response.json()
      const data: RankEntry[] = json.rows
      const responseRankData: RankData[] = data.map(rankEntry => ({
        date: new Date(rankEntry.timestamp).getTime(),
        rank: rankEntry.position,
        score: rankEntry.score
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

  let rankHistory = null
  if (showHistory) {
    if (rankData === null) {
      rankHistory = <LoadingRankHistoryData />
    } else if (typeof rankData === 'undefined') {
      rankHistory = <LoadingRankHistoryDataError />
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
          {timeInLord}h
        </span>
        <span className='score-column'>
          {score}
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
