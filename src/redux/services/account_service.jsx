/** @format */
import { WebClient } from '../../api/webclient';

export const UserLogin = (props) => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'login');
	params.append('username', props.username);
	params.append('password', props.password);
	return WebClient.get(`?${params.toString()}`);
};

export const AddAccount = (props) => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'sign-up');
	params.append('username', props.username);
	params.append('password', props.password);
	params.append('email', props.email);
	return WebClient.post('', JSON.stringify({}), {
		params: params,
		headers: {
			Authority: 'raketero-app.com',
			Accept: 'application/json',
			'content-type': 'application/text',
			'sec-fetch-site': 'cross-site',
			'sec-fetch-mode': 'cors',
			'sec-fetch-dest': 'empty',
			'accept-language': 'en-US,en;q=0.9',
		},
	});
};

export const ViewAccounts = () => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'account-profile');
	params.append('action', 'view');
	params.append('column', 'all');
	return WebClient.get(`?${params.toString()}`);
};

export const ViewAccountByEmail = (props) => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'account-profile');
	params.append('action', 'view');
	params.append('column', 'id');
	params.append('email', props.email);
	return WebClient.get(`?${params.toString()}`);
};

export const UpdateProfile = (props) => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'account-profile');
	params.append('action', 'update');
	params.append('username', props.username);
	params.append('password', props.password);
	params.append('account_id', props.account_id);
	params.append('status', props.status);
	params.append('email', props.email);
	return WebClient.post(`?${params.toString()}`);
};
