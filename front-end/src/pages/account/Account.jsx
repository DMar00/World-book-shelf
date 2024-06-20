import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import useAccount from '../../hooks/useAccount'
import ErrorPage from '../error/ErrorPage'
import avatar from '../../assets/avatar.svg'
import './Account.css'

const Account = () => {
    const { userInfo, showError, isMyAccount} = useAccount();


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
                        <Row className='h-100'>
                            <Col lg={3} sm={12} className='d-flex flex-column justify-content-center align-items-center'>
                                <img src={avatar} className='avatar'/>
                                <span className='username'>{userInfo.username}</span>
                                <span className='name mb-2'>{userInfo.name} {userInfo.surname}</span>
                                <button className='btn-t1'> Edit profile</button>
                            </Col>
                            <Col lg={9} sm={12} className='d-flex justify-content-center'>
                                <h3>Bookshelf</h3>

                            </Col>
                        </Row>
                        
                        
                        
                        
                        
                        
                        : <h3>You're visiting <span style={{color:'#8841CB'}}>{userInfo.username}</span> 's account</h3>
                    }
                
            </Container>
        </div>
    )
}

export default Account
