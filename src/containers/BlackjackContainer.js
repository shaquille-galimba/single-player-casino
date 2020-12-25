// import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
				{/* <img src={images['10C.png'].default} width={150} height={200}/> */}
				<Col className="text-end">Buttons</Col>
				<Col className="text-center"><Link to={`${url}/enter_name`}>New Game</Link></Col>
				<Col className="text-end">Buttons</Col>
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
