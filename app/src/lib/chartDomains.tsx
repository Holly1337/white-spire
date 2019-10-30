import { AxisDomain } from 'recharts'

const RANK_MARGIN = 1
const SCORE_MARGIN = 50

export const getRankDomain = (data: RankData[]): [AxisDomain, AxisDomain] => {
  // de/in-crease the min/max value to make the graph a bit nicer
  let [min, max] = getMinMaxDomain(data, 'rank')
  min = Math.max(1, min - RANK_MARGIN)
  max = max + RANK_MARGIN
  return [min, max]
}

export const getScoreDomain = (data: RankData[]): [AxisDomain, AxisDomain] => {
  // de/in-crease the min/max value to make the graph a bit nicer
  let [min, max] = getMinMaxDomain(data, 'score')
  min = Math.max(1, min - SCORE_MARGIN)
  max = max + SCORE_MARGIN
  return [min, max]
}

const getMinMaxDomain = (data: RankData[], attribute: 'rank' | 'score'): [number, number] => {
  let domainMin = Number.MAX_SAFE_INTEGER
  let domainMax = Number.MIN_SAFE_INTEGER

  data.forEach(dataPoint => {
    const value = dataPoint[attribute]
    if (value === null) {
      return
    }
    if (value < domainMin) {
      domainMin = value
    }
    if (value > domainMax) {
      domainMax = value
    }
  })

  return [domainMin, domainMax]
}
