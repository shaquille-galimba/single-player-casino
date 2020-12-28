import React, { Component } from 'react';

class Result extends Component {

	render() {
		return (
			<div>
				{this.props.latest_score}
			</div>
		)
	}

}

export default Result
