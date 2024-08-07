import React from 'react'
import Book from '../book/Book'
import { useNavigate } from 'react-router-dom'
import './DescrBook.css'

const DescrBook = ({image, title, authors, id, descr, pages}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/book?id='+id);
    };

    return (
        <div className='d-flex flex-column mb-4'>
            <div className='d-flex descr-book'>
                <Book imageUrl={image} className="mini-book-image"/>
                <div className='d-flex flex-column align-items-start'>
                    <span className='descr-book-title'>{title}</span>
                    <span className='descr-book-author mb-1'>{authors}</span>
                    <span>Pages: {pages}</span>
                    <span className='descr-book-plot mb-2'>{descr}</span>
                    <div className='d-flex align-items-end justify-content-end flex-grow-1'>
                        <button className='btn-t1 mt-2 align-self-end' onClick={handleButtonClick}>Show</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DescrBook
