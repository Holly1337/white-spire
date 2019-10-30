import React from 'react'

const DataInfoFooter = () => {
  return (
    <div className='footer'>
      <small>
        Data is based on{' '}
        <a
          style={{ color: 'white' }}
          href='https://underlords.com/leaderboard'
          target='_blank'
          rel='noopener noreferrer'
        >
          <strong>underlords.com/leaderboard</strong>
        </a>.
        Data is not accurate for duplicate playernames
      </small>
    </div>
  )
}

export default DataInfoFooter
