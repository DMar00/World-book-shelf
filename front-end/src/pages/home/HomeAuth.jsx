import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import bookLover from '../../assets/book-lover-animate.svg'
import './Home.css'

const HomeAuth = ({user}) => {
  return (
    <div className='page'>
        <Container className=''>
            <Row>
                <Col lg={5} style={{background:'yellow'}}>
                  <img src={bookLover} className='bookLover'></img>
                  <h3>Welcome <span style={{color:'#8841CB'}}>{user.username}</span></h3>
                </Col>
                <Col lg={7}>
                  {/**filtrare i libri che come genere hanno i generi dei libri inseriti nelle 2 shelf dell'utente */}
                  {/**di tutti i libri prendere i primi 10 per review media con quei generi */}
                  
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default HomeAuth
