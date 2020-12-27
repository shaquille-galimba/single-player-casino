import React, { Component } from 'react';
import PlayerNameForm from '../forms/PlayerNameForm'
import { Link } from 'react-router-dom'

class FormContainer extends Component {

	handleContinueWithCurrentPlayer = () => {
		if (Object.keys(this.props.current_player).length === 0) {
			return null
		} else {
			return(
				<>
					<div>or</div>
					<Link to={`/blackjack/play`}>
						<button className="btn btn-primary">Continue as {this.props.current_player.name}</button>
					</Link>
				</>
			)
		}
	}

	render() {
		return (
			<div className='row d-flex align-items-center customHeight'>
				<div className='col text-center'>
					<PlayerNameForm fetchCurrentPlayer={this.props.fetchCurrentPlayer}/>
					{this.handleContinueWithCurrentPlayer()}
				</div>
			</div>
		)
	}
}

export default FormContainer
