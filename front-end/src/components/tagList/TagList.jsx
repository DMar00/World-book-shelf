import React from 'react'
import {Chip} from '@mui/material'

const TagList = ({list}) => {
  return (
    <div className='d-flex flex-row gap-3'>
      {list.map((item, index) => (
        <Chip key={index} label={item} size="small" />
      ))}
    </div>
  )
}

export default TagList
