import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const connect = () => {
    const WebSocket = window.WebSocket || window.MozWebSocket
    const connection = new WebSocket('ws://localhost:8080')

    connection.onopen = () => {
        console.log('Connection opened')
    }

    connection.onerror = error => {
        console.log('Error occurred', error)
    }

    connection.onmessage = message => {
        console.log('Message received', message.data)
    }
}

connect()

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
