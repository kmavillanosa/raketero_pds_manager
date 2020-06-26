/** @format */

import { WebClient } from '../../api/webclient';

export const GetAllProfiles = () => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'profile-user');
	params.append('action', 'view');
	params.append('column', 'all');
	return WebClient.get(`?${params.toString()}`);
};

export const CreateProfile = (props) => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'profile-user');
	params.append('action', 'add');
	params.append('firstname', props.firstname);
	params.append('lastname', props.lastname);
	params.append('middlename', props.middlename);
	params.append('birthdate', props.birthdate);
	params.append('street_address', props.street_address);
	params.append('barangay', props.barangay);
	params.append('city_municipality', props.city_municipality);
	params.append('state_province', props.state_province);
	params.append('zip_code', props.zip_code);
	params.append('image_url', props.image_url);
	params.append('contact_number', props.contact_number);
	params.append('account_id', 1);
	return WebClient.post(
		`?${params.toString()}`,
		{},
		{
			headers: { accept: '*/*' },
		}
	);
};

export const UpdateProfile = (props) => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'profile-user');
	params.append('action', 'update');
	params.append('firstname', props.firstname);
	params.append('lastname', props.lastname);
	params.append('middlename', props.middlename);
	params.append('birthdate', props.birthdate);
	params.append('street_address', props.street_address);
	params.append('barangay', props.barangay);
	params.append('city_municipality', props.city_municipality);
	params.append('state_province', props.state_province);
	params.append('zip_code', props.zip_code);
	params.append('image_url', props.image_url);
	params.append('contact_number', props.contact_number);
	params.append('account_id', 1);
	return WebClient.get(
		`?${params.toString()}`,
		{},
		{
			headers: { accept: '*/*' },
		}
	);
};

export const DeleteProfile = (props) => {
	var params = new URLSearchParams();
	params.append('key', process.env.REACT_APP_TOKEN);
	params.append('type', 'profile-user');
	params.append('action', 'delete');
	params.append('account_id', props.account_id);
	return WebClient.get(
		`?${params.toString()}`,
		{},
		{
			headers: { accept: '*/*' },
		}
	);
};
