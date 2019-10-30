import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Label, AxisDomain, Legend, TickFormatterFunction
} from 'recharts'
import { getRankDomain, getScoreDomain } from '../../../lib/chartDomains'

interface Props {
  data: RankData[]
}

const RankHistory: React.FC<Props> = ({ data }) => {
  // limit to last 48 entries
  data = [...data].reverse().slice(0, 48)

  const rankDomain = getRankDomain(data)
  const scoreDomain = getScoreDomain(data)

  const tickFormatter: TickFormatterFunction = (tickData) => {
    const date = new Date(tickData)
    return date.toLocaleTimeString().substr(0, 5)
  }

  return (
    <ResponsiveContainer width={'100%'} aspect={2 / 1}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
      >
        <XAxis
          dataKey='date'
          stroke='white'
          tickFormatter={tickFormatter}
        />
        <CartesianGrid stroke='#666666' vertical={false} />
        <YAxis yAxisId={'left'} orientation='left' stroke='white' reversed={true} domain={rankDomain} />
        <YAxis yAxisId={'right'} orientation='right' stroke='gold' reversed={false} domain={scoreDomain} />
        <Legend verticalAlign='top' height={36} />
        <Line
          type='step'
          dot={false}
          dataKey='rank'
          stroke='white'
          strokeWidth={3}
          isAnimationActive={false}
          yAxisId={'left'}
        />
        <Line
          type='step'
          dot={false}
          dataKey='score'
          stroke='gold'
          strokeWidth={3}
          isAnimationActive={false}
          yAxisId={'right'}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RankHistory
