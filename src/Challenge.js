import React, { PureComponent } from 'react'

export default class Challenge extends PureComponent {

	render() {
		const { value } = this.props
		return <h1>{value.question} = {value.answer}?</h1>
	}
}
