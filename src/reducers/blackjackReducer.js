const blackjackReducer = (state = { game: {}, players: [], current_player: {}, loading: false }, action) => {
	switch(action.type) {
		case 'LOADING_PLAYER':
			return {
				...state,
				current_player: state.current_player,
				loading: true
			}
		case 'ADD_PLAYER':
			return {
				...state,
				current_player: action.current_player,
				loading: false
			}

		default:
			return state;
	}
}

export default blackjackReducer
