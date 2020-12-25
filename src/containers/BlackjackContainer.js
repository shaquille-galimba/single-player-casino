import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {
  BrowserRouter as Router,
  Switch,
  Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";
import FormContainer from './FormContainer'
import Play from '../components/Play'
import ProfitDisplay from '../components/ProfitDisplay'

function importAll(r) {
	let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const BlackjackContainer = props => {
	let { path, url } = useRouteMatch();
	return(
		<div>
			<Row>
				<Col className="text-center">
					<ButtonGroup size="sm">
						<ProfitDisplay title="Blackjack earnings" content="1000" value="Game profit"/>
						<ProfitDisplay title="Player earnings" content="-1000" value="Player profit"/>
					</ButtonGroup>
				</Col>

				<Col className="text-center">
					<Link to={`${url}/enter_name`}>
						<button className="btn btn-light">New Game</button>
					</Link>
				</Col>
				<Col className="text-center">
					<button className="btn btn-dark btn-sm">High scores</button>
				</Col>
			</Row>

			<Switch>
				<Route exact path={`${path}/enter_name`}>
					<FormContainer />
				</Route>
				<Route exact path={`${path}/play`}>
					<Play />
				</Route>
			</Switch>
		</div>
	)

}

export default BlackjackContainer
