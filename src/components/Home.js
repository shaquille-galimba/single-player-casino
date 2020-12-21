import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import logo from '../assets/suits.png'
import Image from 'react-bootstrap/Image'

class Home extends Component {

	render() {
		return (
			<>
				<div className="d-flex flex-column align-items-center justify-content-center">
					<Image
						src={logo}
						class="img-thumbnail align-self-center"
						width={200}
						height={200}
					/>
					<h1>Welcome to Single Player Casino!</h1>
					<p className="fs-6">Please choose a game:</p>
					<Row>
						<Col className="text-center">
							<Link to="/blackjack">
								<Button variant="light">Blackjack</Button>
							</Link>
						</Col>
					</Row>
				</div>
			</>
		)
	}
}

export default Home
