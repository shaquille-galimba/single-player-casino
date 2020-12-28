import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class PlayerNameForm extends Component {

	constructor(props) {
		super(props);

		this.state ={
			text: '',
			isSubmitted: false
		}
	}

	handleOnChange = e => {
		this.setState({
			text: e.target.value
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.fetchCurrentPlayer(this.state.text)
		this.setState({isSubmitted: true})
	}

	render() {
		return (
			<>
				<form onSubmit={e => this.handleSubmit(e)}>
					<h1>Please enter your name</h1>
					<div>
						<input
							type="text"
							id="playerNameInput"
							className="field"
							placeholder="Enter name"
							autoComplete="off"
							value={this.state.text}
							onChange={(e) => this.handleOnChange(e)}
							required
						/>
						<input type="submit" className="btn btn-light btn-sm"/>
					</div>
				</form>
				{this.state.isSubmitted && <Redirect to="/blackjack/play" />}
			</>
		)
	}
}

export default PlayerNameForm;
