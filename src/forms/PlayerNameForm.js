import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class PlayerNameForm extends Component {

	constructor(props) {
		super(props);

		this.state ={
			text: ''
		}
	}

	handleOnChange = e => {
		this.setState({
			text: e.target.value
		}, console.log(this.state.text))
	}

	handleSubmit = e => {
		e.preventDefault()
	}

	render() {
		return (
			<form onSubmit={e => this.handleSubmit(e)}>
				<h1>Please enter your name</h1>
				<div className="form-input-material">
					<input
						type="text"
						id="playerNameInput"
						className="form-control-material"
						placeholder="Enter name"
						autoComplete="off"
						value={this.state.text}
						onChange={(e) => this.handleOnChange(e)}
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary"/>
			</form>
		)
	}
}

export default PlayerNameForm;
