import React from 'react'
import './Book.css'

const Book = ({imageUrl}) => {
  return (
    <div className='book' style={{ backgroundImage: `url(${imageUrl})` }}>
      
    </div>
  )
}

export default Book
