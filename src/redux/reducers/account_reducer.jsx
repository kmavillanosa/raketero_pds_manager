/** @format */

import { actionTypes } from '../actions/actionTypes';

const initialState = {
	profileList: [],
};

export function accountReducer(state = initialState, action) {
	var stateCopy = Object.assign({}, state, {});

	switch (action.type) {
		case actionTypes.getProfiles:
			stateCopy.profileList = action.payload;
			return stateCopy;

		default:
			return state;
	}
}
