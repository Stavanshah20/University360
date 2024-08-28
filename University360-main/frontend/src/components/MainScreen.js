import React from 'react'
import { Container, Row } from 'react-bootstrap';
import './MainScreen.css';

const MainScreen = ({ title, children }) => {
    return (
        <div className='mainblack'>
            <Container>
                <Row>
                    <div className='page'>
                        {title && (<>
                            <h1 className='heading'>{title}</h1>
                            <hr />
                        </>)}
                    </div>
                </Row>
                {children}
            </Container>
        </div>
    )
}

export default MainScreen;
