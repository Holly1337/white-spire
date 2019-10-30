export const rankEntriesToPlayersData = (entries: RankEntry[]): PlayersData => {
  const playersData: { [id: string]: any } = {}

  const timeStamps: number[] = entries.map(entry => new Date(entry.timestamp).getTime())
  const uniqueTimeStamps: Set<number> = new Set(timeStamps)
  const [current, previous] = Array.from(uniqueTimeStamps).sort((t1, t2) => t2 - t1)

  entries.forEach((entry: RankEntry) => {
    if (!playersData[entry.playername]) {
      playersData[entry.playername] = {}
    }
    const timestamp = new Date(entry.timestamp).getTime()
    if (timestamp === current) {
      playersData[entry.playername].current = entry
    }
    if (timestamp === previous) {
      playersData[entry.playername].previous = entry
    }
  })

  // remove entries that don't have 'current'
  const namesToRemove = new Set<string>()
  Object.values(playersData).forEach(
    (playerData) => {
      if (typeof playerData.current === 'undefined') {
        namesToRemove.add(playerData.previous.playername)
      }
    }
  )
  Array.from(namesToRemove).forEach(
    (name: string) => { delete playersData[name] }
  )

  return playersData as PlayersData
}
