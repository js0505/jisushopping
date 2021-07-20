import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom';




const Header = () => {
    
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const username = localStorage.getItem('name');
    
    const loginCheck = () => {
            const token = localStorage.key('token');
            if (token) {
            setIsLoggedIn(true)
            }
    }
    
    const onLogoutHandler = (e) => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        setIsLoggedIn(false)
        history.push('/')
    }

    useEffect(() => {
        loginCheck()
    }, [])

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href='/'>JisuShop</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />

                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link href='/cart'>
                                    <i className='fas fa-shopping-cart' /> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {/* 로그인 상태에 따라서 메뉴변경 */}
                            {isLoggedIn
                                ? (
                                    <NavDropdown title={username} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={onLogoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown> 
                                ) : (
                                    <LinkContainer to = '/login'>
                                        <Nav.Link href='/login'>
                                            <i className='fas fa-user' /> Login
                                        </Nav.Link>
                                    </LinkContainer>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;