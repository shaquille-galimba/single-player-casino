import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import logo from './assets/suits.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";
import BlackjackContainer from './containers/BlackjackContainer';
import Home from './containers/Home'
// import FormContainer from './containers/FormContainer'

class App extends Component {

	render() {

		return (
			<Router>
				<div className="App">
					<Navbar bg="dark" variant="dark">
						<Link to="/">
							<Navbar.Brand>
								<img src={logo} width="30" height="30"/>{' '}
								Single Player Casino
							</Navbar.Brand>
						</Link>
					</Navbar>
					<Container>
						<Switch>
							<Route exact path="/">
								<Home logo={logo}/>
							</Route>
							{/* <Route exact path="/blackjack/enter_name" component={FormContainer}/> */}
							<Route path="/blackjack" component={BlackjackContainer}/>
						</Switch>
					</Container>
				</div>
			</Router>
		);
	}
}

export default App;
