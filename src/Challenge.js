import React from 'react'

const Challenge = props => {
    const { value } = props
    return <h1>{value.question} = {value.suggestedAnswer}?</h1>
}

export default Challenge
