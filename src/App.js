import React, { PureComponent } from 'react'
import { Button, Col, Container, Jumbotron, Nav, Navbar, NavItem, Row } from 'reactstrap'
import './App.css'
import Challenge from './Challenge'
import Login from './Login'
import RatingTable from './RatingTable'
import RoundSummary from './RoundSummary'
import AnswerAccepted from './AnswerAccepted'
import { API_URL } from './config'

class App extends PureComponent {

    state = {
        error: false,
        joined: false,
        user: {},
        challenge: null,
        ratingTable: [],
        waitingForNewRound: true,
        userGaveAnswer: false
    }

    showGame() {
        const { challenge, roundSummary, waitingForNewRound, userGaveAnswer } = this.state
        return <div className="game-pnl-wrapper">
            <Jumbotron className="text-center game-pnl">
                <div className="round-summary-pnl">
                    {waitingForNewRound ? <RoundSummary value={roundSummary}/> : this.format(challenge, userGaveAnswer)}
                </div>
                <div className="btn-pnl">
                    <Button outline color="success" size="lg" className="left-submit-btn"
                        onClick={() => this.registerAnswer(true)}
                        disabled={userGaveAnswer || waitingForNewRound}>TRUE</Button>
                    <Button outline color="danger" size="lg" className="right-submit-btn"
                        onClick={() => this.registerAnswer(false)}
                        disabled={userGaveAnswer || waitingForNewRound}>FALSE</Button>
                </div>
            </Jumbotron>
        </div>
    }

    render() {
        const { error, joined, user, ratingTable } = this.state
        return (
            <Container className="main-container">
                {!joined && <Login error={error} onLogin={() => this.join()}/>}
                {joined && <Navbar color="transparent" light className="greeting-pnl">
                    <Nav className="ml-auto" navbar>
                        <NavItem className="username-pnl">
                            <p>{`Hello, ${user.name}`}</p>
                            <Button color="link" onClick={this.leave}>Leave</Button>
                        </NavItem>
                    </Nav>
                </Navbar>}
                {joined && <div className="align-middle">
                    <Row className="game-board-pnl">
                        <Col md={ratingTable.length > 0 ? '9' : '12'}>
                            <Row noGutters>
                                {this.showGame()}
                            </Row>
                        </Col>
                        {ratingTable.length > 0 && <Col xs="12" sm="12" md="3" className="w-100">
                            <Row className="h-100 w-100" noGutters>
                                <RatingTable data={ratingTable} currentUser={this.state.user}/>
                            </Row>
                        </Col>}
                    </Row>
                </div>}
            </Container>
        )
    }

    join = () => {
        const WebSocket = window.WebSocket || window.MozWebSocket
        const connection = new WebSocket(API_URL)
        this.setState({ connection })

        connection.onopen = () => {
            this.setState({ joined: true })
        }

        connection.onmessage = (message) => {
            const json = JSON.parse(message.data)
            const { type } = json

            if (type === 'WELCOME') {
                const { user, ratingTable } = json
                this.setState({ user, ratingTable })
            } else if (type === 'START_ROUND') {
                const { challenge } = json
                this.setState({ challenge, waitingForNewRound: false })
            } else if (type === 'END_ROUND') {
                const { roundSummary, ratingTable } = json
                this.setState({ roundSummary, ratingTable, waitingForNewRound: true, userGaveAnswer: false })
            } else {
                throw new Error('unexpected message type ' + type)
            }
        }

        connection.onerror = () => {
            this.setState({ error: true })
        }
    }

    leave = () => {
        this.setState({ joined: false, error: false })
        const { connection } = this.state
        connection.close()
    }

    format = (challenge, userGaveAnswer) => userGaveAnswer ? <AnswerAccepted/> : <Challenge value={challenge}/>

    registerAnswer = (agree) => {
        this.setState({ userGaveAnswer: true })
        const { connection } = this.state
        connection.send(agree)
    }
}

export default App
