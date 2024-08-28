import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, FormControl, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

function Header({ setSearch }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        history.push("/");
    };

    return (
        <Navbar bg="primary" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand><Link to="/">Newsify</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className='m-auto'>
                        {userInfo && (
                            <Form>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form>
                        )}
                    </Nav>

                    <Nav className="me-auto">
                        {userInfo ? (
                            <>
                                <Nav.Link id="RouterNavLink"><Link to="/mynotes">MyNotes</Link></Nav.Link>
                                {/* <Nav.Link href="#link">Ravi Patel</Nav.Link> */}
                                <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
