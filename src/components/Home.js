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
				<Row>
					<Col className='text-center'>
						<Image
							src={logo}
							class="img-thumbnail align-self-center"
							width={200}
							height={200}
						/>
					</Col>
				</Row>
				<Row>
					<Col className='text-center'>
						<h1>Welcome to Single Player Casino!</h1>
					</Col>
				</Row>
				<Row>
					<Col className='text-center'>
						<p>Please choose a game:</p>
					</Col>
				</Row>
				<Row>
					<Col className="text-center">
						<Link to="/blackjack">
							<Button variant="light">Blackjack</Button>
						</Link>
					</Col>
					<Col className="text-center">
						<Button variant="light" className="text-nowrap" disabled>Coming soon</Button>
					</Col>
				</Row>
			</>
		)
	}
}

export default Home
