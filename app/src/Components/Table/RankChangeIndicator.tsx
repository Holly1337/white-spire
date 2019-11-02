import React from 'react'
import classnames from 'classnames'

interface Props {
  change: RankChange
  rank: number
}

const RankChangeIndicator = ({ change, rank }: Props) => {
  const rankClassName = classnames({
    'rank-change': true,
    'rank-up': change !== null && change > 0,
    'rank-down': change !== null && change < 0,
    'rank-no-change': change === 0,
  })

  let icon
  if (change === null) {
    icon = <i className='fa fa-star color-gold' />
  } else if (change < 0) {
    icon = <i className='fa fa-caret-down color-red' />
  } else if (change > 0) {
    icon = <i className='fa fa-caret-up color-green' />
  } else if (change === 0) {
    icon = <i className='fas fa-minus' />
  }

  return (
    <span className='rank'>
      <span className={rankClassName}>
        <span className='rank-change-icon'>
          {icon}
        </span>
        <span className='rank-change-value'>
          {change !== null && change !== 0 && change}
        </span>
      </span>

      <span className='rank-value'>
        {rank}
      </span>
    </span>
  )
}

export default RankChangeIndicator
