import React from 'react'
import Book from '../book/Book'
import { useNavigate } from 'react-router-dom'
import './DescrBook.css'

const DescrBook = ({image, title, authors, id, descr}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/book?id='+id);
    };

    return (
        <div className='d-flex flex-column '>
            <div className='d-flex descr-book'>
                <Book imageUrl={image} className="mini-book-image"/>
                
                <div className='d-flex flex-column align-items-start'>
                    <span className='descr-book-title'>{title}</span>
                    <span className='descr-book-author'>{authors}</span>
                    <span className='descr-book-plot'>{descr}</span>
                    <button className='btn-t1 mt-2' onClick={handleButtonClick}>Show</button>
                </div>

            </div>
        </div>
    )
}

export default DescrBook
