import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './Home.css'

const HomeAuth = ({user}) => {
  return (
    <div className='page'>
        <Container className='d-flex align-items-center justify-content-center'>
            <Row>
                <h3>Welcome <span style={{color:'#8841CB'}}>{user.username}</span></h3>
            </Row>
        </Container>
    </div>
  )
}

export default HomeAuth
