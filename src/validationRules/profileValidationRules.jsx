/** @format */

import * as yup from 'yup';

export const ProfileCreateValidationRules = yup.object().shape({
	username: yup.string().required('Please provide value').nullable(),
	email: yup
		.string()
		.email('Please provide valid email address')
		.max(25)
		.required('Please provide value')
		.nullable(),
	password: yup.string().max(10).required('Please provide value').nullable(),
	firstname: yup.string().required('Please provide value').nullable(),
	lastname: yup.string().required('Please provide value').nullable(),
	birthdate: yup.date().required('Please provide value').nullable(),
	street_address: yup.string().required('Please provide value').nullable(),
	barangay: yup.string().required('Please provide value').nullable(),
	city_municipality: yup.string().required('Please provide value').nullable(),
	state_province: yup.string().required('Please provide value').nullable(),
	zip_code: yup.string().required().nullable('Please provide value').nullable(),
	image_url: yup.string().nullable(),
	contact_number: yup
		.string()
		.required('Please provide value')
		.matches(/\b\d{11}\b/, {
			message: 'Must be exactly 11 numbers',
			excludeEmptyString: true,
		})
		.nullable(),
	middlename: yup.string().required('Please provide value').nullable(),
});

export const ProfileUpdateValidationRules = yup.object().shape({
	firstname: yup.string().required('Please provide value').nullable(),
	lastname: yup.string().required('Please provide value').nullable(),
	birthdate: yup.date().required('Please provide value').nullable(),
	street_address: yup.string().required('Please provide value').nullable(),
	barangay: yup.string().required('Please provide value').nullable(),
	city_municipality: yup.string().required('Please provide value').nullable(),
	state_province: yup.string().required('Please provide value').nullable(),
	zip_code: yup.string().required().nullable('Please provide value').nullable(),
	image_url: yup.string().nullable(),
	contact_number: yup
		.string()
		.required('Please provide value')
		.matches(/\b\d{11}\b/, {
			message: 'Must be exactly 11 numbers',
			excludeEmptyString: true,
		})
		.nullable(),
	middlename: yup.string().required('Please provide value').nullable(),
});
