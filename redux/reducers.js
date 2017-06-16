const globalReducer = (state = {
	time: 0,
}, action) => {
	switch (action.type) {
		case 'SET_TIME':  return {
			...state,
			time: action.payload
		}
		default: return state
	}
}

export default globalReducer