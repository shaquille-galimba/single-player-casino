import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Spinner from 'react-bootstrap/Spinner'
import {
  BrowserRouter as Router,
  Switch,
  Route,
	Link
} from "react-router-dom";
import FormContainer from './FormContainer'
import Play from '../components/Play'
import ProfitDisplay from '../components/ProfitDisplay'
import { fetchGame, fetchCurrentPlayer } from '../actions/playerActions'

function importAll(r) {
	let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

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
				<div  className="text-center">
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			)
		} else {
			const { game } = this.props
			return (
				<Row>
					<Col className="text-center">
						<ButtonGroup size="sm">
							<ProfitDisplay title={game.name} content={game.profit} value={game.name}/>
							{this.handlePlayerProfitDisplay()}
						</ButtonGroup>
					</Col>

					<Col className="text-center">
						<Link to={`/blackjack/enter_name`}>
							<button className="btn btn-light">New Game</button>
						</Link>
					</Col>
					<Col className="text-center">
						<button className="btn btn-dark btn-sm">High scores</button>
					</Col>
				</Row>
			)
		}
	}

	render() {
		return(
			<div>
				{this.handleLoading()}

				<Switch>
					<Route exact path={`/blackjack/enter_name`}>
						<FormContainer fetchCurrentPlayer={this.props.fetchCurrentPlayer} current_player={this.props.current_player}/>
					</Route>
					<Route exact path={`/blackjack/play`}>
						<Play game={this.props.game} current_player={this.props.current_player}/>
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
