import React, { PureComponent } from 'react'
import { Button } from 'reactstrap'
import './App.css'

class App extends PureComponent {

    state = { joined: false, user: {}, challenge: {} }

    render() {
        const { joined, user, challenge } = this.state
        return (
            <div className="App">
                {joined && <div>
                    <p>
                        Hello, {user.name}!
                    </p>
                    <p>
                        {challenge.question} = {challenge.answer} ?
                    </p>
                    <p>
                        <Button>True</Button>
                        <Button>False</Button>
                    </p>
                </div>}
                {!joined && <Button onClick={this.join}>Join the game!</Button>}
                {joined && <Button color="link" onClick={this.leave}>Leave the game</Button>}
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
            const { user, challenge } = json
            this.setState({ user, challenge })
        }
        this.setState({ joined: true })
    }

    leave = () => {
        this.setState({ joined: false })
        const { connection } = this.state
        connection.close()
    }
}

export default App
