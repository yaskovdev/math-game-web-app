import React, { PureComponent } from 'react'

export default class RoundSummary extends PureComponent {

    render() {
        const { value } = this.props
        return <h2>{this.formatWaitingMessage(value)}</h2>
    }

    formatWaitingMessage = (roundSummary) => {
        if (roundSummary === 'CORRECT_FIRST_ANSWER') {
            return <span className={'text-success'}>Correct answer!</span>
        } else if (roundSummary === 'CORRECT_LATE_ANSWER') {
            return <span className={'text-warning'}>Correct, but too late...</span>
        } else if (roundSummary === 'WRONG_ANSWER') {
            return <span className={'text-danger'}>Wrong answer.</span>
        } else {
            return <span>Get ready...</span>
        }
    }
}
