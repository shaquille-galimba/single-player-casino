const api_url = "http://localhost:3001/api/v1"

export const fetchGame = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_GAME'})
		fetch(`${api_url}/games/1`)
		.then(response => response.json())
		.then(game => {
			dispatch({ type: 'ADD_GAME', game: game.data})
		})
	}
}
