import React from 'react'
import douyuIcon from '../../assets/images/douyu-icon.png'

interface Props {
  playerName: string
}

const TWITCH = 'tv/'
const DOYU = '斗鱼'
// const HUYA = '虎牙'

const DOUYO_REGEXP = /(\d[\d]+)/g

type StreamTypes = 'twitch' | 'douyu' | 'huya' | null

const getStreamtype = (playerName: string): StreamTypes => {
  if (playerName.includes(TWITCH)) {
    return 'twitch'
  }
  if (playerName.includes(DOYU) && playerName.match(DOUYO_REGEXP)) {
    return 'douyu'
  }
  // if (playerName.includes(HUYA)) {
  //   return 'huya'
  // }
  return null
}


const TwitchName = ({ playerName }: Props) => {
  const startIndex = playerName.indexOf(TWITCH) + 3
  const channel = playerName.substr(startIndex)
  const link = `https://twitch.tv/${channel}`
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      style={{ color: 'white' }}
    >
      {playerName}
      <span style={{ marginLeft: 10 }}>
        <i className='fab fa-twitch' />
      </span>
    </a>
  )
}

const DouyuName = ({ playerName }: Props) => {
  const matches = playerName.match(DOUYO_REGEXP)
  if (!matches || matches.length === 0) {
    return <BasicName playerName={playerName} />
  }
  let channelID = matches.pop()
  const link = `https://www.douyu.com/${channelID}`
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      style={{ color: 'white' }}
    >
      {playerName}
      <img src={douyuIcon} alt={`douyu ${playerName}`} style={{ marginLeft: 8, height: 19}} />
    </a>
  )
}

const PlayerName = ({ playerName }: Props) => {
  const streamType = getStreamtype(playerName)
  switch (streamType) {
    case 'douyu':
      return <DouyuName playerName={playerName} />
    case 'twitch':
      return <TwitchName playerName={playerName} />
    case null:
    default:
      return <BasicName playerName={playerName} />
  }
}

const BasicName = ({ playerName }: Props) => {
  return <span>{playerName}</span>
}

export default PlayerName
