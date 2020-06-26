/** @format */

import { CreateProfile, UpdateProfile } from '../services/profile_service';

export const createProfile = (request) => (dispatch) => {
	return CreateProfile(request);
};

export const updateProfile = (request) => (dispatch) => {
	return UpdateProfile(request);
};
