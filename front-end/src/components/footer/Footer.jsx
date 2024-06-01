import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook , faInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <Container>
        <Row>
          <Col lg={4} sm={12} className='part link'>
            <a>About us</a>
            <a>Terms</a>
            <a>Policy</a>
            <a>Ads</a>
          </Col>
          <Col lg={4} sm={12} className='part'>
            <a>© 2024 WorldBookShelf</a>
          </Col>
          <Col lg={4} sm={12} className='part socials'>
            <FontAwesomeIcon icon={faFacebook} className='icon'/>
            <FontAwesomeIcon icon={faInstagram} className='icon'/>
            <FontAwesomeIcon icon={faTiktok} className='icon'/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
