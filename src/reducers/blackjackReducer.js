const blackjackReducer = (state = { game: {}, players: [], current_player: {}, loading: false }, action) => {
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

		default:
			return state;
	}
}

export default blackjackReducer
