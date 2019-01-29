import React, { PureComponent } from 'react'

export default class RoundSummary extends PureComponent {

    render() {
        const { value } = this.props
        return <h1>{this.formatWaitingMessage(value)}</h1>
    }

    formatWaitingMessage = (result) => {
        if (result === 'CORRECT_FIRST_ANSWER') {
            return <span className={'text-success'}>Correct answer!</span>
        } else if (result === 'CORRECT_LATE_ANSWER') {
            return <span className={'text-warning'}>Correct, but too late...</span>
        } else if (result === 'WRONG_ANSWER') {
            return <span className={'text-danger'}>Wrong answer.</span>
        } else {
            return <span>Waiting for a new round...</span>
        }
    }
}
