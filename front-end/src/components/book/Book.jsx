import React from 'react';
import noPhoto from '../../assets/no_photo.avif';
import './Book.css';

const Book = ({ imageUrl }) => {
  return (
    <div 
      className='book' 
      style={{ backgroundImage: `url(${imageUrl ? imageUrl : noPhoto})` }}
    ></div>
  );
}

export default Book;
