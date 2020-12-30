import React, { Component } from 'react';

class Result extends Component {

	render() {
		const { name, latest_score } = this.props.current_player
		return (
			<div className="row">
				<div className='col text-center'>
					Thank you for playing {name}, you won ${latest_score}!
				</div>
			</div>
		)
	}

}

export default Result
