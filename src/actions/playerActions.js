const api_url = "https://spcasino.herokuapp.com/api/v1"

export const fetchGame = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_GAME'})
		fetch(`${api_url}/games/1`)
		.then(response => response.json())
		.then(game => {
			dispatch({ type: 'ADD_GAME', game: {...game.data.attributes, id: game.data.id}})
		})
		.catch(error => console.log(error));
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
		.catch(error => console.log(error));
	}
}

export const updatePlayerScore = (player_id, latest_score) => {
	return (dispatch) => {
		const data = { latest_score: latest_score - 1000 }

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
		.catch(error => console.log(error));
	}
}

export const fetchHighscores = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_HIGHSCORES'})
		fetch(`${api_url}/games/1/players/highscores`)
		.then(response => response.json())
		.then(response => {
			dispatch({ type: 'ADD_HIGHSCORES', highscores: [...response.data] })
		})
		.catch(error => console.log(error));
	}
}
