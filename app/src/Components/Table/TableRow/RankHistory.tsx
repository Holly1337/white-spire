import React from 'react'
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  TickFormatterFunction,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { getRankDomain, getScoreDomain } from '../../../lib/chartDomains'

interface Props {
  data: RankData[]
}

const DEFAULT_ENTRIES_SHOWN = 48

const RankHistory: React.FC<Props> = ({ data }) => {
  data = [...data].reverse()
  const rankDomain = getRankDomain(data)
  const scoreDomain = getScoreDomain(data)

  const yAxisTickFormatter: TickFormatterFunction = (tickData) => {
    const date = new Date(tickData)
    return date.toLocaleTimeString().substr(0, 5)
  }
  const brushTickFormatter = (date: number) => new Date(date).toLocaleDateString()
  const brushStartIndex = Math.max(0, data.length - DEFAULT_ENTRIES_SHOWN)

  return (
    <>
      <ResponsiveContainer width={'100%'} aspect={2 / 1}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          <XAxis
            dataKey='date'
            stroke='white'
            tickFormatter={yAxisTickFormatter}
          />
          <CartesianGrid stroke='#666666' vertical={false} />
          <YAxis yAxisId={'left'} orientation='left' stroke='white' reversed={true} domain={rankDomain} />
          <YAxis yAxisId={'right'} orientation='right' stroke='gold' reversed={false} domain={scoreDomain} />
          <Legend verticalAlign='top' height={36} />
          <Tooltip
            itemStyle={{ color: 'white' }}
            labelStyle={{ color: 'white', textDecoration: 'underline', paddingBottom: 5, paddingTop: 5 }}
            contentStyle={{ backgroundColor: 'black', padding: 10 }}
            labelFormatter={(label) => <span>{new Date(label).toLocaleString()}</span>}
          />
          {
            data.length > DEFAULT_ENTRIES_SHOWN && (
              <Brush
                dataKey={'date'}
                startIndex={brushStartIndex}
                endIndex={data.length - 1}
                tickFormatter={brushTickFormatter}
                stroke='white'
                fill='#25262e'
              />
            )
          }
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
    </>
  )
}

export default RankHistory
