import React from 'react'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{

}

const PlayerSearch: React.FC<Props> = (props) => {
  return (
    <div className='player-search'>
      <div>
        <i className='fa fa-search' />
        <input
          type='text'
          placeholder='player name'
          className='player-search-input'
          name='player-search'
          {...props}
        />
      </div>
    </div>
  )
}

export default PlayerSearch
