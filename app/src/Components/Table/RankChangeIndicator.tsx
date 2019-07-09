import React from 'react'
import classnames from 'classnames'
import { RankChange } from '../../App'

interface Props {
  change: RankChange
}

const RankChangeIndicator = ({ change }: Props) => {
  const rankClassName = classnames({
    rank: true,
    'rank-up': change !== 'new' && change > 0,
    'rank-down': change !== 'new' && change < 0
  })

  let icon
  if (change === 'new') {
    icon = <i className='fa fa-star color-gold' />
  } else if (change < 0 ) {
    icon = <i className='fa fa-caret-down color-red' />
  } else if (change > 0) {
    icon = <i className='fa fa-caret-up color-green' />
  }

  return (
    <span className={rankClassName}>
      <span className='rank-change-icon'>
        {icon}
      </span>
      <span className='rank-change-value'>
        {change !== 'new' && change !== 0 && change}
      </span>
    </span>
  )
}

export default RankChangeIndicator
