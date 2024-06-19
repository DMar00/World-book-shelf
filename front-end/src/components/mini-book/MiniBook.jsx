import React from 'react'
import Book from '../book/Book'
import { useNavigate } from 'react-router-dom'
import './MiniBook.css'

const MiniBook = ({image, title, authors, id}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/book?id='+id);
    };

    return (
        <div className='mini-book-container d-flex flex-column align-items-center '>
            <div className='d-flex flex-column align-items-center text-center mini-book'>
                <Book imageUrl={image} className="mini-book-image"/>
                <span className='mini-title'>{title}</span>
                <span className='mini-authors'>{authors}</span>
            </div>
            <button className='btn-t1 mt-2'  onClick={handleButtonClick}>Show</button>
        </div>
    )
}

export default MiniBook
