const api_url = "http://localhost:3001/api/v1"

export const fetchGame = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_GAME'})
		fetch(`${api_url}/games/1`)
		.then(response => response.json())
		.then(game => {
			dispatch({ type: 'ADD_GAME', game: {...game.data.attributes, id: game.data.id}})
		})
	}
}

export const fetchCurrentPlayer = name => {
	return (dispatch) => {
		const data = {name}

		fetch(`${api_url}/games/1/players`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(player => {
			dispatch({ type: 'ADD_CURRENT_PLAYER', current_player: {...player.data.attributes, id: player.data.id}})
		})
	}
}

export const updatePlayerScore = (player_id, latest_score) => {
	return (dispatch) => {
		const data = { latest_score: latest_score }

		fetch(`${api_url}/games/1/players/${player_id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(player => {
			dispatch({ type: 'ADD_CURRENT_PLAYER', current_player: {...player.data.attributes, id: player.data.id}})
		})
		.then(() => {
			fetch(`${api_url}/games/1`)
			.then(response => response.json())
			.then(game => {
				dispatch({ type: 'ADD_GAME', game: {...game.data.attributes, id: game.data.id}})
			})
		})
	}
}
