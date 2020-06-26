/** @format */

import { actionTypes } from '../actions/actionTypes';

const initialState = {
	isLogged: false,
	currentProfile: null,
};

export function profileReducer(state = initialState, action) {
	var stateCopy = Object.assign({}, state, {});

	switch (action.type) {
		case actionTypes.login:
			stateCopy.isLogged = true;
			stateCopy.currentProfile = action.payload;
			return stateCopy;

		case actionTypes.logout:
			stateCopy.isLogged = false;
			return stateCopy;

		default:
			return state;
	}
}
