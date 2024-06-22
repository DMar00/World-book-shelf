import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import bookLover from '../../assets/book-lover-animate.svg'
import useHomeAuth from '../../hooks/useHomeAuth.jsx'
import MiniBook from '../../components/mini-book/MiniBook.jsx'
import './Home.css'

const HomeAuth = ({user}) => {
  const { booksFound } = useHomeAuth();


  return (
    <div className='page'>
        <Container className=''>
            <Row className='my-4'>  
                <Col lg={5} style={{background:'yellow'}}>
                  <img src={bookLover} className='bookLover'></img>
                  <h3>Welcome <span style={{color:'#8841CB'}}>{user.username}</span></h3>
                </Col>
                <Col lg={7}>
                  {/**filtrare i libri che come genere hanno i generi dei libri inseriti nelle 2 shelf dell'utente */}
                  {/**di tutti i libri prendere i primi 10 per review media con quei generi */}
                  <h5>Recommended for you</h5>
                  <div className='d-flex flex-row gap-4 flex-wrap justify-content-center mt-4'>
                        {booksFound.map(book => (
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

export default HomeAuth
