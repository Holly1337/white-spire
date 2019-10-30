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
        <CartesianGrid stroke='#666666' vertical={false} />
        <YAxis yAxisId={'left'} stroke='white' reversed={true} />
        <YAxis yAxisId={'right'} orientation='right' stroke='#ffff65' reversed={false} />
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
          stroke='#ffff65'
          strokeWidth={3}
          isAnimationActive={false}
          yAxisId={'right'}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RankHistory
