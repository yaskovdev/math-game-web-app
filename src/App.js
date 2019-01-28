import React, { PureComponent } from 'react'
import { Button, Table } from 'reactstrap'
import './App.css'

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
            <div className="App">
                {joined && <div>
                    <p>
                        Hello, {user.name}!
                    </p>
                    <p>
                        {waitingForNewRound ? this.formatWaitingMessage(result) : this.format(challenge, userGaveAnswer)}
                    </p>
                    <p>
                        <Button onClick={() => this.answer(true)}
                            disabled={userGaveAnswer || waitingForNewRound}>True</Button>
                        <Button onClick={() => this.answer(false)}
                            disabled={userGaveAnswer || waitingForNewRound}>False</Button>
                    </p>
                </div>}
                {!joined && <Button onClick={this.join}>Join the game!</Button>}
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
            </div>
        )
    }

    join = () => {
        const WebSocket = window.WebSocket || window.MozWebSocket
        const connection = new WebSocket('ws://localhost:8080')
        this.setState({ connection })

        connection.onopen = () => {
            console.log('Connection opened')
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
        this.setState({ joined: true })
    }

    leave = () => {
        this.setState({ joined: false })
        const { connection } = this.state
        connection.close()
    }

    format = (challenge, userGaveAnswer) =>
        userGaveAnswer ? 'Thank you for your answer! Waiting for others...' : `${challenge.question} = ${challenge.answer}?`

    answer = (agree) => {
        this.setState({ userGaveAnswer: true })
        const { connection } = this.state
        connection.send(agree)
    }

    formatWaitingMessage = (result) => {
        if (result === 'CORRECT_FIRST_ANSWER') {
            return 'You won the round! Waiting for a new round to begin...'
        } else if (result === 'CORRECT_LATE_ANSWER') {
            return 'Your answer is correct, but someone was faster. Waiting for a new round to begin...'
        } else if (result === 'WRONG_ANSWER') {
            return 'Sorry, you gave a wrong answer. Waiting for a new round to begin...'
        } else {
            return 'Waiting for a new round to begin...'
        }
    }
}

export default App
