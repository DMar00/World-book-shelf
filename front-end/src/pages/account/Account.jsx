import React from 'react'
import { Container, Row } from 'react-bootstrap'
import useAccount from '../../hooks/useAccount'
import ErrorPage from '../error/ErrorPage'

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
            <Container className='d-flex align-items-center justify-content-center'>
                <Row>
                    {
                        isMyAccount ? <h3>This is your account <span style={{color:'#8841CB'}}>{userInfo.username}</span></h3>
                        : <h3>You're visiting <span style={{color:'#8841CB'}}>{userInfo.username}</span> 's account</h3>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Account
