import React from 'react'
import logo from './logo.jpg'
import { Button, Col, Row } from 'reactstrap'

const Login = props => {
    const { error, onLogin } = props
    return <div className="h-100 w-100 login-pnl">
        <img src={logo} className="logo-row" alt="Math Game Logo"/>
        <Button onClick={onLogin}>Let&#39;s play a game!</Button>
        {error && <Row className="error-row">
            <Col>
                An error occurred. Most likely the user limit was reached. Try again later.
            </Col>
        </Row>}
    </div>
}

export default Login
