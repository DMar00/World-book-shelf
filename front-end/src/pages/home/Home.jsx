import React from 'react'
import { useAuth } from '../../contenxt/AuthContext'
import { Container, Row } from 'react-bootstrap'
import './Home.css'
import HomeAuth from './HomeAuth'

const Home = () => {
    const { user } = useAuth();

    //se utente è loggato
    if(user){
        return(
            <HomeAuth user={user}/>
        )
    }

    //se utente non è loggato
    return (
        <div className='page'>
            <Container className='d-flex align-items-center justify-content-center'>
                <Row className='header'>
                    <h1>Welcome to WorldBookShelf</h1>
                    <h4>Find your next favorite book</h4>
                    <h4>Save and Share your top picks</h4>
                </Row>
            </Container>
        </div>
    )
}

export default Home
