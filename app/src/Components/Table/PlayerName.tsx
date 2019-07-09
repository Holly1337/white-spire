import React from 'react'

interface Props {
  playerName: string
}

const twitchFlag = 'tv/'

const PlayerName = ({ playerName }: Props) => {
  if (!playerName.includes(twitchFlag)) {
    return <span>{playerName}</span>
  }

  const startIndex = playerName.indexOf(twitchFlag) + 3
  const channel = playerName.substr(startIndex)
  const link = `https://twitch.tv/${channel}`
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      style={{color: 'white'}}
    >
      {playerName}
    </a>
  )
}

export default PlayerName
