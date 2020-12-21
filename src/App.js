import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/suits.png'


class App extends Component {

	render() {

		return (
			<div className="App">
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand>
						<img src={logo} width="30" height="30"/>{' '}
						Single Player Casino
					</Navbar.Brand>
				</Navbar>
				<Container>
					App.js
				</Container>
			</div>
		);
	}
}

export default App;
