import React, { Fragment } from 'react'
import logo from './logo.jpg'
import { Button, Col, Row } from 'reactstrap'

const Login = props => {
    const { error, onLogin } = props
    return <Fragment>
        <Row className="login-pnl text-center">
            <Col>
                <img src={logo} className="logo-row" alt="Math Game Logo"/>
            </Col>
        </Row>
        <Row className="text-center">
            <Col>
                <Button onClick={onLogin}>Let&#39;s play a game!</Button>
            </Col>
        </Row>
        {error && <Row className="error-row">
            <Col>
                An error occurred. Most likely the user limit was reached. Try again later.
            </Col>
        </Row>}
    </Fragment>
}

export default Login
