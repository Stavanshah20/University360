import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import "./LandingPage.css";

const LandingPage = ({ history }) => {

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo)
            history.push("/mynotes");
    }, [history])

    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to Newsify</h1>
                            <p title='subtitle'>One Safe place for all your notes.</p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button size='lg' className='landingButton'>Login</Button>
                            </a>
                            <a href="/register">
                                <Button size='lg' className='landingButton' variant='outline-primary'>SignUp</Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
