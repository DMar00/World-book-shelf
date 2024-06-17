import React from 'react'
import {Container, Col, Row, ProgressBar} from 'react-bootstrap'
import {Rating} from '@mui/material'
import './BookPage.css'
import TagList from '../../components/tagList/TagList'
import Book from '../../components/book/Book'
import useBook from '../../hooks/useBook'
import ErrorPage from '../error/ErrorPage'

const BookPage = () => {
    const { bookInfo, showError} = useBook();


    if(showError.value){
        return(
            <ErrorPage error={showError.message}/>
        )
    }

    const total_review = bookInfo.number_stars_1 + bookInfo.number_stars_2 + bookInfo.number_stars_3 + bookInfo.number_stars_4 + bookInfo.number_stars_5;
    const average = (
        bookInfo.number_stars_1*1 + 
        bookInfo.number_stars_2*2 + 
        bookInfo.number_stars_3*3 + 
        bookInfo.number_stars_4*4 +
        bookInfo.number_stars_5*5 
    )/total_review;
    const average_review = average.toFixed(2);

  return (
    <div className='page my-4'>
      <Container>
        <Row>
            <Col lg={3} sm={12}>
                <Row className='d-flex justify-content-center gap-3'>
                    <div className='d-flex justify-content-center'>
                        <Book/>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn-t1'>Want to read</button>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <h6>Rate this book</h6>
                        <Rating 
                            name="book-rating" 
                            value={0} 
                            precision={1}
                            size="large"/>
                    </div>
                </Row>
            </Col>
            <Col lg={9} sm={12}>
                <h2>{bookInfo.title}</h2>
                <h4>{bookInfo.authors}</h4>
                <div className='rating-bar d-flex flex-row align-items-center gap-3'>
                    <Rating 
                        name="book-rating" 
                        value={average_review} 
                        precision={0.1}
                        size="large"
                        readOnly />
                    <span>{average_review}</span>
                </div>
                <div className='plot-box my-3'>
                    <textarea readOnly value={bookInfo.description}/>
                </div>
                <div>
                    <h6>Genres:</h6>
                    <TagList list={bookInfo.genres}/>
                </div>
                <hr/>
                <div className='community-reviews'>
                    <div className='d-flex flex-column align-items-center mb-3'>
                        <h4>Community Reviews</h4>
                        <div className='rating-bar d-flex flex-row align-items-center gap-3'>
                            <Rating 
                            name="book-rating" 
                            value={average_review} 
                            precision={0.1}
                            size="large"
                            readOnly />
                            <span>{average_review}</span>
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>5</span>
                            <ProgressBar now={(bookInfo.number_stars_5 / total_review)*100} className='bar'/>
                            <span>{bookInfo.number_stars_5}</span>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>4</span>
                            <ProgressBar now={(bookInfo.number_stars_4 / total_review)*100} className='bar'/>
                            <span>{bookInfo.number_stars_4}</span>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>3</span>
                            <ProgressBar now={(bookInfo.number_stars_3 / total_review)*100} className='bar'/>
                            <span>{bookInfo.number_stars_3}</span>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>2</span>
                            <ProgressBar now={(bookInfo.number_stars_2 / total_review)*100} className='bar'/>
                            <span>{bookInfo.number_stars_2}</span>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>1</span>
                            <ProgressBar now={(bookInfo.number_stars_1 / total_review)*100} className='bar'/>
                            <span>{bookInfo.number_stars_1}</span>
                        </div>
                    </div>
                </div>
                <hr/>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BookPage
