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
import { fetchGame } from '../actions/playerActions'

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
			return (
				<Row>
					<Col className="text-center">
						<ButtonGroup size="sm">
							<ProfitDisplay title="Blackjack earnings" content="1000" value="Game profit"/>
							<ProfitDisplay title="Player earnings" content="-1000" value="Player profit"/>
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
						<FormContainer />
					</Route>
					<Route exact path={`/blackjack/play`}>
						<Play />
					</Route>
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		game: state.game,
		loading: state.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchGame: () => dispatch(fetchGame())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlackjackContainer)
