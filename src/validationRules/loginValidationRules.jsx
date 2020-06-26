/** @format */

import * as yup from 'yup';

export const loginValidationRule = yup.object().shape({
	username: yup.string().required('Username required').nullable(),
	password: yup.string().required('password required').nullable(),
});
