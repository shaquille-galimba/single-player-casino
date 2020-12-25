const blackjackReducer = (state = { game: {}, players: [], loading: false }, action) => {
	switch(action.type) {
		case 'LOADING_GAME':
			return {
				...state,
				games: state.game,
				loading: true
			}
		case 'ADD_GAMES':
			return {
				...state,
				games: action.game,
				loading: false
			}

		default:
			return state;
	}
}

export default blackjackReducer
