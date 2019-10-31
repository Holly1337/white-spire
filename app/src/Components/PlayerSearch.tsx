import React from 'react'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{

}

const PlayerSearch: React.FC<Props> = (props) => {
  return (
    <span style={{ marginLeft: 30 }}>
      <span style={{ marginRight: 5 }}><i className='fa fa-search' /></span>
      <input
        type='text'
        placeholder='player name'
        className='player-search-input'
        name='player-search'
        {...props}
      />
    </span>
  )
}

export default PlayerSearch
