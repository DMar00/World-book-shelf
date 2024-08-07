import React from 'react'
import { useAuth } from '../../contenxt/AuthContext'
import { Container, Row, Col } from 'react-bootstrap'
import './Home.css'
import bookLover from '../../assets/book-lover-animate.svg'
import HomeAuth from './HomeAuth'
import useQueryBooks from '../../hooks/useQueryBooks'
import MiniBook from '../../components/mini-book/MiniBook'

const Home = () => {
    const { user } = useAuth();
    const { topRatedBooks } = useQueryBooks();

    //se utente è loggato
    if(user){
        return(
            <HomeAuth user={user}/>
        )
    }

    //se utente non è loggato
    return (
        <div className='page my-5'>
            <Container className=''>
                <Row className='header d-flex align-items-center justify-content-center'>
                    <img src={bookLover} className='bookLover'></img>
                    <h1>Welcome to <span style={{color:'#8841CB'}}>WorldBookShelf</span></h1>
                    <h4>Find your next favorite book</h4>
                    <h4>Save and Share your top picks</h4>
                </Row>
                <hr/>
                <Row className='d-flex align-items-center justify-content-center text-center mt-5'>
                    <h4 style={{fontWeight:'600'}}>Top 10 books reviewed</h4>

                    <Col sm={7}>
                        <div className='d-flex flex-row gap-4 flex-wrap justify-content-center mt-4'>
                            {topRatedBooks.map(book => (
                                <div key={book._id}>
                                    <MiniBook image={book.cover} title={book.title} authors={book.authors} id={book.id_book}/>
                                </div>
                            ))}
                        </div>
                    </Col>


                    

                </Row>
            </Container>
        </div>
    )
}

export default Home
