import React from 'react'
import {Container, Col, Row, ProgressBar} from 'react-bootstrap'
import {Rating} from '@mui/material'
import './BookPage.css'
import TagList from '../../components/tagList/TagList'
import Book from '../../components/book/Book'

const BookPage = () => {
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
                <h2>Book Title</h2>
                <h4>Author</h4>
                <div className='rating-bar d-flex flex-row align-items-center gap-3'>
                    <Rating 
                        name="book-rating" 
                        value={3.3} 
                        precision={0.1}
                        size="large"
                        readOnly />
                    <span>3.3</span>
                </div>
                <div className='plot-box my-3'>
                    <textarea readOnly>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.
                    </textarea>
                </div>
                <div>
                    <h6>Genres:</h6>
                    <TagList list={['genre1', 'genre2', 'genre3']}/>
                </div>
                <hr/>
                <div className='community-reviews'>
                    <div className='d-flex flex-column align-items-center mb-3'>
                        <h4>Community Reviews</h4>
                        <div className='rating-bar d-flex flex-row align-items-center gap-3'>
                            <Rating 
                            name="book-rating" 
                            value={3.3} 
                            precision={0.1}
                            size="large"
                            readOnly />
                            <span>3.3</span>
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>5</span>
                            <ProgressBar now={60} className='bar'/>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>4</span>
                            <ProgressBar now={80} className='bar'/>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>3</span>
                            <ProgressBar now={20} className='bar'/>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>2</span>
                            <ProgressBar now={10} className='bar'/>
                        </div>
                        <div className='rate-bar d-flex flex-row gap-3 align-items-center'>
                            <span>1</span>
                            <ProgressBar now={40} className='bar'/>
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
