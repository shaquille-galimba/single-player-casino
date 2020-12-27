import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
			<Row className='d-flex align-items-center customHeight'>
				<Col className='text-center'>
					<PlayerNameForm fetchCurrentPlayer={this.props.fetchCurrentPlayer}/>
					{this.handleContinueWithCurrentPlayer()}
				</Col>
			</Row>
		)
	}
}

export default FormContainer
