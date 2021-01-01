import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHighscores } from '../actions/playerActions'
import Spinner from 'react-bootstrap/Spinner'

class Highscores extends Component {

	componentDidMount() {
		this.props.fetchHighscores()
	}

	handleLoading = () => {
		if (this.props.loading) {
			return (
				<div className="text-center">
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			)
		} else {
			return this.props.highscores.map(player => (
				<div className='row' key={player.id}>
					<div className="col text-center">
						{player.attributes.name}
					</div>
					<div className="col text-center">
						{player.attributes.highest_score}
					</div>
				</div>
			))
		}
	}



	render() {
		console.log(this.props)

		return (
			<div>
				{this.handleLoading()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		highscores: state.highscores,
		loading: state.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchHighscores: () => dispatch(fetchHighscores())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Highscores)
