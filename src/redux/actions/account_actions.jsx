/** @format */

import {
	UserLogin,
	AddAccount as add,
	ViewAccounts,
	ViewAccountByEmail,
	UpdateProfile,
} from '../services/account_service';
import { actionTypes } from './actionTypes';

export const ViewAccountCollection = () => (dispatch) => {
	return ViewAccounts().then((resp) => {
		if (resp.problem === null) {
			dispatch({
				type: actionTypes.getAccounts,
				payload: resp.data,
			});
			return resp;
		} else {
			return Promise.resolve(resp);
		}
	});
};

export const ViewAccountDetailsByEmail = (props) => (dispatch) => {
	return ViewAccountByEmail(props).then((resp) => {
		if (resp.problem === null) {
			dispatch({
				type: actionTypes.getAccount,
				payload: resp.data,
			});
			return resp;
		} else {
			return Promise.resolve(resp);
		}
	});
};

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

export const Update = (request) => (dispatch) => {
	return UpdateProfile(request).then((resp) => {
		if (resp.problem === null) {
			dispatch({
				type: actionTypes.update,
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
