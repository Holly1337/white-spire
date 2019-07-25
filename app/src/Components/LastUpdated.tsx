import React from 'react'

interface Props {
  date: Date
}

const LastUpdated = ({ date }: Props) => {
  return (
    <div className='last-updated' style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <span>
        Last updated: {date.toLocaleString()}
      </span>
      <span style={{ color: '#999999' }}>
        <small><i>Updates every hour</i></small>
      </span>
    </div>
  )
}

export default LastUpdated
