import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
// import logo from '../assets/suits.png'
import Image from 'react-bootstrap/Image'

class Home extends Component {

	render() {
		return (
			<>
				<div className='row'>
					<div className='col text-center'>
						<Image
							src={this.props.logo}
							className="img-thumbnail align-self-center"
							width={200}
							height={200}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col text-center'>
						<h1>Welcome to Single Player Casino!</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col text-center'>
						<p>Please choose a game:</p>
					</div>
				</div>
				<div className='row'>
					<div className="col text-center">
						<Link to="/blackjack">
							<Button variant="dark">Blackjack</Button>
						</Link>
					</div>
					<div className="col text-center">
						<Button variant="dark" className="text-nowrap" disabled>Coming soon</Button>
					</div>
				</div>
			</>
		)
	}
}

export default Home
