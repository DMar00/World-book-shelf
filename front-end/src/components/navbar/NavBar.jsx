import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contenxt/AuthContext'
import './Navbar.css'

const NavBar = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">WorldBookShelf</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <div className='search-bar'>
                    <form>
                        <input type='search' name='input' placeholder='Search books ...'/> 
                        <button type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon'/>
                        </button>
                    </form>
                </div>
            </Nav>
            
            {
                //se non sono autenticato mostro SignUp e Login
                !user ? 
                <Nav>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link> 
                </Nav>
                :
                //se sono autenticato mostro Account e Logout
                <Nav>
                <Nav.Link href ='/account'>Account</Nav.Link>
                <Nav.Link href="" onClick={logout}>Logout</Nav.Link> 
                </Nav>
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavBar
