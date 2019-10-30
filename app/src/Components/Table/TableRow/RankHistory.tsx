import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Label
} from 'recharts'

interface Props {
  data: RankData[]
}

const RankHistory: React.FC<Props> = ({ data }) => {
  // limit to last 48 entries
  data = data.slice(0, 48)
  return (
    <ResponsiveContainer width={'100%'} aspect={2 / 1}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
      >
        <XAxis
          dataKey='date'
          stroke='white'
          tickFormatter={(tickData) => {
            const date = new Date(tickData)
            return date.toLocaleTimeString().substr(0, 5)
          }}
        />
        <YAxis stroke='white' reversed={true} />
        <CartesianGrid stroke='#666666' vertical={false} />
        <Line
          type='step'
          dot={false}
          dataKey='rank'
          stroke='white'
          strokeWidth={3}
          isAnimationActive={false}
          yAxisId={0}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RankHistory
