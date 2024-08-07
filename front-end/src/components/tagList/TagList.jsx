import React from 'react'
import {Chip} from '@mui/material'
import './TagList.css'

const TagList = ({list}) => {
  return (
    <div className='d-flex flex-row gap-3 list-gen'>
      {list.map((item, index) => (
        <Chip 
          key={index} 
          label={item} 
          size="small"
          sx={{
            backgroundColor: '#8741CA',
            color: 'white'
          }} />
      ))}
    </div>
  )
}

export default TagList
