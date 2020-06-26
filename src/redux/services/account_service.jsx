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
	return WebClient.post(`?${params.toString()}`);
};
