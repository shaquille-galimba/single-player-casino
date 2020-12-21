import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

class Home extends Component {

	render() {
		return (
			<Row className="d-flex align-items-center justify-content-center customHeight">
				<Col className="text-center">
					<Link to="/blackjack">
						<Button variant="light">Blackjack</Button>
					</Link>
				</Col>
				<Col className="text-center">
					<Button variant="light" disabled>Coming soon</Button>
				</Col>
			</Row>
		)
	}
}

export default Home
