import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Spinner from 'react-bootstrap/Spinner'
import {
  Switch,
  Route,
	Link
} from "react-router-dom";
import FormContainer from './FormContainer'
import Play from '../components/Play'
import ProfitDisplay from '../components/ProfitDisplay'
import { fetchGame, fetchCurrentPlayer } from '../actions/playerActions'
import Result from '../components/Result'
import Highscores from '../components/Highscores'

class BlackjackContainer extends Component {

	componentDidMount() {
		this.props.fetchGame()
	}

	handlePlayerProfitDisplay = () => {
		const { current_player } = this.props
		if (Object.keys(current_player).length === 0) {
			return null
		} else {
			return(<ProfitDisplay title={current_player.name} content={current_player.profit} value={current_player.name}/>)
		}
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
			const { game } = this.props
			return (
				<div className='row'>
					<div className="col text-center">
						<ButtonGroup size="sm">
							<ProfitDisplay title={game.name} content={game.profit} value={game.name}/>
							{this.handlePlayerProfitDisplay()}
						</ButtonGroup>
					</div>

					<div className="col text-center">
						<Link to={`/blackjack/enter_name`}>
							<button className="btn btn-light">New Game</button>
						</Link>
					</div>
					<div className="col text-center">
						<Link to={'/blackjack/highscores'}>
							<button className="btn btn-dark btn-sm">High scores</button>
						</Link>
					</div>
				</div>
			)
		}
	}

	render() {
		const { fetchCurrentPlayer, current_player, game } = this.props
		return(
			<div>
				{this.handleLoading()}

				<Switch>
					<Route exact path={`/blackjack/enter_name`}>
						<FormContainer fetchCurrentPlayer={fetchCurrentPlayer} current_player={current_player}/>
					</Route>
					<Route exact path={`/blackjack/play`}>
						<Play game={game} current_player={current_player}/>
					</Route>
					<Route exact path={'/blackjack/result'}>
						<Result current_player={current_player} fetchGame={fetchGame}/>
					</Route>
					<Route exact path={'/blackjack/highscores'}>
						<Highscores />
					</Route>
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		game: state.game,
		loading: state.loading,
		current_player: state.current_player
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchGame: () => dispatch(fetchGame()),
		fetchCurrentPlayer: name => dispatch(fetchCurrentPlayer(name))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlackjackContainer)
