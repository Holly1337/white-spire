import React, { ChangeEvent, useEffect, useState } from 'react'
import Table from './Components/Table/Table'
import LastUpdated from './Components/LastUpdated'
import DataLoadingIndicator from './Components/Notifications/DataLoadingIndicator'
import Header from './Components/Layout/Header'
import SiteWrapper from './Components/Layout/SiteWrapper'
import DataInfoFooter from './Components/Layout/DataInfoFooter'
import { rankEntriesToPlayersData } from './lib/convert'
import PlayerSearch from './Components/PlayerSearch'

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [leaderboard, setLeaderboard] = useState<FullLeaderboardEntry[] | null | undefined>(null)

  useEffect(() => {
    fetch('/api/v1/fullLeaderboard')
      .then(res => res.json())
      .then((leaderboard: FullLeaderboardEntry[]) => {
        setLeaderboard(leaderboard)
      })
      .catch(() => { setLeaderboard(undefined) })
  }, [])

  if (leaderboard === null) {
    return (
      <SiteWrapper>
        <Header />
        <DataLoadingIndicator />
      </SiteWrapper>
    )
  }

  if (typeof leaderboard === 'undefined') {
    return (
      <SiteWrapper>
        <Header />
        <h1>Error loading data</h1>
      </SiteWrapper>
    )
  }

  const lowerCaseSearch = searchText.toLowerCase()
  const filteredLeaderboard: FullLeaderboardEntry[] = Object.values(leaderboard).filter(
    entry => entry.playername.toLowerCase().includes(lowerCaseSearch)
  ).sort(
    (p1, p2) => p1.position - p2.position
  )

  let lastUpdated
  if (leaderboard.length === 0) {
    lastUpdated = new Date()
  } else {
    lastUpdated = new Date(leaderboard[0].timestamp)
  }

  const onPlayerSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <SiteWrapper>
      <Header />
      <PlayerSearch value={searchText} onChange={onPlayerSearchChange} />
      <LastUpdated date={lastUpdated} />
      <Table entries={leaderboard} />
      <DataInfoFooter />
    </SiteWrapper>
  )
}

export default App
