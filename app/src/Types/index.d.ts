type RankChange = number | 'new'

interface RankEntry {
  id: number
  timestamp: string
  playername: string
  position: number
  score: number
}

interface RankData {
  date: number
  rank: number | null
  score: number | null
}

interface PlayerLeaderboardData {
  current: RankEntry,
  previous?: RankEntry
}

// get current leaderboard by mapping over PlayersData, get the current entries, and sort by rank
interface PlayersData {
  [id: string]: PlayerLeaderboardData
}

interface PlayerDataResponse {
  count: number,
  rows: RankEntry[]
}
