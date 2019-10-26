import React from 'react'

const SiteWrapper: React.FC = ({ children }) => {
  return (
    <div className='site-wrapper'>
      {children}
    </div>
  )
}

export default SiteWrapper
