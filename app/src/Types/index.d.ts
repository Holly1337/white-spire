type PlayerName = string

interface Rank {
  rank: number,
  playerName: PlayerName,
  score: number
}

type Ranks = Rank[]

interface LeaderboardEntry {
  id: number,
  ranks: Ranks
}

type LeaderboardData = LeaderboardEntry[]

type RankChange = number | 'new'

interface PlayerData extends Rank {
  rankChange: RankChange
}

interface PlayerHistory {
  [id: string]: number[]
}
