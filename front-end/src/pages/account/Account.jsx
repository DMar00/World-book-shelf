import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import useAccount from '../../hooks/useAccount'
import useBook from '../../hooks/useBook'
import ErrorPage from '../error/ErrorPage'
import avatar from '../../assets/avatar.svg'
import MiniBook from '../../components/mini-book/MiniBook'
import './Account.css'

const Account = () => {
    const { userInfo, showError, isMyAccount, readBooks, toReadBooks} = useAccount();


    if(showError.value){
        return(
            <ErrorPage error={showError.message}/>
        )
    }

    //se non è il mio account
    return (
        <div className='page'> 
            <Container className=''>
                    {
                        isMyAccount ? 
                        <Row className='h-100 my-4'>
                            <Col lg={3} sm={12} className='d-flex flex-column justify-content-center align-items-center'>
                                <img src={avatar} className='avatar'/>
                                <span className='username'>{userInfo.username}</span>
                                <span className='name mb-2'>{userInfo.name} {userInfo.surname}</span>
                                <button className='btn-t1'> Edit profile</button>
                            </Col>
                            <Col lg={9} sm={12} className=''>
                                <Row>
                                    <h2 className='text-center'>Bookshelf</h2>
                                </Row>
                                <Row className='d-flex flex-wrap'>
                                        <h3>Read</h3>
                                        {readBooks.length === 0 ? (
                                            <div style={{ minHeight: '267.4px' }}>
                                                <p>No books saved in this shelf</p>
                                            </div>
                                        ) : (
                                            <div className='d-flex flex-row gap-3'>
                                                {readBooks.map(book => (
                                                    <div key={book._id}>
                                                        <MiniBook image={book.cover} title={book.title} authors={book.authors} id={book.id_book}/>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                </Row>
                                <Row className='d-flex mt-5'>
                                    <h3>Want to read</h3>
                                    {toReadBooks.length === 0 ? (
                                        <div style={{ minHeight: '267.4px' }}>
                                            <p>No books saved in this shelf</p>
                                        </div>
                                    ) : (
                                        <div className='d-flex flex-row gap-3'>
                                            {toReadBooks.map(book => (
                                                <div key={book._id}>
                                                    <MiniBook image={book.cover} title={book.title} authors={book.authors} id={book.id_book}/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                        
                        
                        
                        
                        
                        
                        : <h3>You're visiting <span style={{color:'#8841CB'}}>{userInfo.username}</span> 's account</h3>
                    }
                
            </Container>
        </div>
    )
}

export default Account
