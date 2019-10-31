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
  const [playersData, setPlayersData] = useState<PlayersData | null>(null)

  useEffect(() => {
    fetch('/api/v1/leaderboard?limit=2')
      .then(res => res.json())
      .then((data: RankEntry[]) => {
        const playersData = rankEntriesToPlayersData(data)
        setPlayersData(playersData)
      })
  }, [])

  if (playersData === null) {
    return (
      <SiteWrapper>
        <Header />
        <DataLoadingIndicator />
      </SiteWrapper>
    )
  }

  const lowerCaseSearch = searchText.toLowerCase()
  const leaderboard: RankEntry[] = Object.values(playersData).map(
    entry => entry.current
  ).filter(
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
      <Table entries={leaderboard} playersData={playersData} />
      <DataInfoFooter />
    </SiteWrapper>
  )
}

export default App
