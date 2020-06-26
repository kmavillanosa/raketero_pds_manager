/** @format */

import { UserLogin, AddAccount as add } from '../services/account_service';
import { actionTypes } from './actionTypes';

export const LoginUser = (request) => (dispatch) => {
	return UserLogin({
		username: request.username,
		password: request.password,
	}).then((resp) => {
		if (resp.problem === null) {
			localStorage.setItem('token', resp.data);
			dispatch({
				type: actionTypes.login,
				payload: resp.data,
			});
			return resp;
		} else {
			return Promise.resolve(resp);
		}
	});
};

export const Logout = () => (dispatch) => {
	localStorage.clear();
	dispatch({
		type: actionTypes.logout,
	});
};

export const AddAccount = (request) => (dispatch) => {
	return add(request);
};
