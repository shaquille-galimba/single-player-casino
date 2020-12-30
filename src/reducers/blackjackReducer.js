const blackjackReducer = (state = { game: {}, highscores: [], current_player: {}, loading: false }, action) => {
	switch(action.type) {
		case 'LOADING_GAME':
			return {
				...state,
				game: state.game,
				loading: true
			}
		case 'ADD_GAME':
			return {
				...state,
				game: action.game,
				loading: false
			}
		case 'ADD_CURRENT_PLAYER':
			return {
				...state,
				current_player: action.current_player
			}
		case 'LOADING_HIGHSCORES':
			return {
				...state,
				highscores: [...state.highscores],
				loading: true
			}
		case 'ADD_HIGHSCORES':
			return {
				...state,
				highscores: [...action.highscores],
				loading: false
			}

		default:
			return state;
	}
}

export default blackjackReducer
