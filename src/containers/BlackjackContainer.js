import React, { Component } from 'react';

function importAll(r) {
	let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

class BlackjackContainer extends Component {

	render() {
		return(
			<div>
				<img src={images['10C.png'].default} width={150} height={200}/>
			</div>
		)
	}
}

export default BlackjackContainer
