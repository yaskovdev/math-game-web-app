import React from 'react'

const Challenge = props => {
    const { value } = props
    return <h2>{value.question} = {value.suggestedAnswer}?</h2>
}

export default Challenge
