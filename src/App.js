import React, { Fragment, PureComponent } from 'react'
import { Button, ButtonGroup, Col, Container, Row, Table } from 'reactstrap'
import './App.css'
import Challenge from './Challenge'
import RoundSummary from './RoundSummary'
import AnswerAccepted from './AnswerAccepted'
import logo from './logo.jpg'

class App extends PureComponent {

    state = {
        joined: false,
        user: {},
        challenge: null,
        ratingTable: [],
        waitingForNewRound: true,
        userGaveAnswer: false
    }

    render() {
        const { joined, user, challenge, ratingTable, result, waitingForNewRound, userGaveAnswer } = this.state
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        {joined && <div>
                            <p>
                                <h4>{user.name}</h4>
                            </p>
                            <p>
                                {waitingForNewRound ?
                                    <RoundSummary value={result}/> : this.format(challenge, userGaveAnswer)}
                            </p>
                            <p>
                                <ButtonGroup size={'lg'}>
                                    <Button onClick={() => this.answer(true)}
                                        disabled={userGaveAnswer || waitingForNewRound}>True</Button>
                                    <Button onClick={() => this.answer(false)}
                                        disabled={userGaveAnswer || waitingForNewRound}>False</Button>
                                </ButtonGroup>
                            </p>
                        </div>}
                        {!joined && <Fragment>
                            <Row className={'App-logo-row'}>
                                <Col>
                                    <img src={logo} alt="Math Game Logo"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={this.join}>Let&#39;s play a game!</Button>
                                </Col>
                            </Row>
                        </Fragment>}
                        {joined && <Button color="link" onClick={this.leave}>Leave the game</Button>}
                        {joined && ratingTable.length > 0 && <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratingTable.map(user => {
                                    const current = user.id === this.state.user.id
                                    return <tr key={user.id}
                                        className={current ? 'App-user-table-record' : ''}>
                                        <td>{current ? user.name + ' (you)' : user.name}</td>
                                        <td>{user.score}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>}
                    </Col>
                </Row>
            </Container>
        )
    }

    join = () => {
        const WebSocket = window.WebSocket || window.MozWebSocket
        const connection = new WebSocket('ws://localhost:8080')
        this.setState({ connection })

        connection.onopen = () => {
            this.setState({ joined: true })
        }

        connection.onerror = error => {
            console.log('Error occurred', error)
        }

        connection.onmessage = message => {
            const json = JSON.parse(message.data)
            const { type } = json

            if (type === 'WELCOME') {
                const { user, ratingTable } = json
                this.setState({ user, ratingTable })
            } else if (type === 'START_ROUND') {
                const { challenge } = json
                this.setState({ challenge, waitingForNewRound: false })
            } else if (type === 'END_ROUND') {
                const { result, ratingTable } = json
                this.setState({ result, ratingTable, waitingForNewRound: true, userGaveAnswer: false })
            } else {
                throw new Error('unexpected message type ' + type)
            }
        }
    }

    leave = () => {
        this.setState({ joined: false })
        const { connection } = this.state
        connection.close()
    }

    format = (challenge, userGaveAnswer) => userGaveAnswer ? <AnswerAccepted/> : <Challenge value={challenge}/>

    answer = (agree) => {
        this.setState({ userGaveAnswer: true })
        const { connection } = this.state
        connection.send(agree)
    }
}

export default App
