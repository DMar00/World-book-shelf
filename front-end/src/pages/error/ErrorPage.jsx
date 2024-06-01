import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import './ErrorPage.css'

const ErrorPage = ({error}) => {
  return (
    <div className='page'>
        <Container className='d-flex align-items-center justify-content-center'>
            <div className='message-box'>
              <h3>
                <FontAwesomeIcon icon={faTriangleExclamation} /> Error 
              </h3>
              <br/>
              <h4>{error}</h4>
            </div>
        </Container>
    </div>
  )
}

export default ErrorPage
