import ACTION_TYPES from './ACTION_TYPES'

export const setTime = time => dispatch => dispatch({ type: ACTION_TYPES.SET_TIME, payload: time })