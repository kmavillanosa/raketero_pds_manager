/** @format */

import React, { Component } from 'react';
import {
	Form,
	Col,
	Container,
	Button,
	Card,
	Spinner,
	FormControl,
	Tabs,
	Tab,
	FormLabel,
} from 'react-bootstrap';
import { Formik } from 'formik';
import {
	ProfileCreateValidationRules,
	ProfileUpdateValidationRules,
} from '../../../validationRules/profileValidationRules';

import { ToastsStore } from 'react-toasts';

import { connect } from 'react-redux';
import {
	AddAccount,
	ViewAccountDetailsByEmail,
} from '../../../redux/actions/account_actions';
import {
	createProfile,
	updateProfile,
} from '../../../redux/actions/profile_actions';
import { toastr } from 'react-redux-toastr';
import { saveAs } from 'file-saver';

class RecordForm extends Component {
	state = {
		isFetchingEmail: false,
		account_index: 0,
		account_id: null,
		user_id: null,
		isWebcam: false,
		isLoading: false,
		username: null,
		email: null,
		password: null,
		firstname: null,
		lastname: null,
		birthdate: null,
		street_address: null,
		barangay: null,
		city_municipality: null,
		state_province: null,
		zip_code: null,
		image_url: null,
		contact_number: null,
		middlename: null,
		status: 'PENDING',
		img: null,
	};

	webcam = null;
	setRef = (webcam) => {
		this.webcam = webcam;
	};

	capture = () => {
		if (this.webcam) {
			const imageSrc = this.webcam.getScreenshot();
			var savepath = 'demo.png';
			saveAs(imageSrc, savepath);
			this.setState({ img: savepath });
		}
	};

	render() {
		return (
			<Formik
				validationSchema={
					this.props.mode === 'add'
						? ProfileCreateValidationRules
						: ProfileUpdateValidationRules
				}
				onSubmit={(values, action) => {
					if (this.props.mode === 'add') {
						if (this.state.account_index === 0) {
							this.fileUpload(this.state.img);

							values.image_url = '-';
							this.props.createProfile(values).then((r) => {
								ToastsStore.success('Profile Created!', 3000);
								this.props.closeModal();
								this.props.reload();
							});
						} else {
							this.props
								.addAccount({
									username: values.username,
									password: values.password,
									email: values.email,
								})
								.then((r) => {
									if ((r.problem === null) & (r.data.responsecode === 1)) {
										this.fileUpload(this.state.img);

										ToastsStore.success('Account Created!', 3000);
										values.account_id = r.data.account_id;
										values.image_url =
											'https://raketero-app.com/staging/public/user-images/demo.png';
										this.props.createProfile(values).then((r) => {
											ToastsStore.success('Profile Created!', 3000);
											this.props.closeModal();
											this.props.reload();
										});
									} else {
										action.setSubmitting(false);
										ToastsStore.error('Request Failed!', r.problem, 3000);
									}
								});
						}
					} else {
						this.props.updateProfile(values).then((r) => {
							ToastsStore.success('Profile Modified!', 3000);
							setTimeout(() => {
								this.props.closeModal();
								this.props.reload();
							}, 1000);
						});
					}
				}}
				initialValues={{
					account_id: null,
					user_id:
						this.props.mode === 'add'
							? this.state.user_id
							: this.props.item.user_id,
					username:
						this.props.mode === 'add'
							? this.state.username
							: this.props.item.username,
					email:
						this.props.mode === 'add'
							? this.state.email
							: this.props.item.email,
					password:
						this.props.mode === 'add'
							? this.state.password
							: this.props.item.password,
					firstname:
						this.props.mode === 'add'
							? this.state.firstname
							: this.props.item.firstname,
					lastname:
						this.props.mode === 'add'
							? this.state.lastname
							: this.props.item.lastname,
					birthdate:
						this.props.mode === 'add'
							? this.state.birthdate
							: this.props.item.birthdate,
					street_address:
						this.props.mode === 'add'
							? this.state.street_address
							: this.props.item.street_address,
					barangay:
						this.props.mode === 'add'
							? this.state.barangay
							: this.props.item.barangay,
					city_municipality:
						this.props.mode === 'add'
							? this.state.city_municipality
							: this.props.item.city_municipality,
					state_province:
						this.props.mode === 'add'
							? this.state.state_province
							: this.props.item.state_province,
					zip_code:
						this.props.mode === 'add'
							? this.state.zip_code
							: this.props.item.zip_code,
					image_url:
						this.props.mode === 'add'
							? this.state.image_url
							: this.props.item.image_url,
					contact_number:
						this.props.mode === 'add'
							? this.state.contact_number
							: this.props.item.contact_number,
					middlename:
						this.props.mode === 'add'
							? this.state.middlename
							: this.props.item.middlename,
					status:
						this.props.mode === 'add'
							? this.state.status
							: this.props.item.status,
				}}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
					isSubmitting,
					setValues,
				}) => (
					<Container>
						<Form noValidate onSubmit={handleSubmit}>
							{/* <Card hidden={this.props.mode !== 'add'}>
								<Card.Body>
									<ButtonToolbar>
										<FormControl
											className='btn'
											name='image_url'
											id='image_url'
											type='file'
											onChange={(e) => {
												// this.setState({ img: e.target.files[0] });
												console.log(e.target.files[0]);
											}}
											value={this.state.img}
										/>
										<Button
											size='sm'
											variant='secondary'
											onClick={() => {
												this.setState({ isWebcam: !this.state.isWebcam });
											}}
											className='m-1'
										>
											Take Photo
										</Button>
										<Button
											hidden={!this.state.isWebcam}
											onClick={() => {
												this.capture();
												this.setState({ isWebcam: false });
											}}
											size='sm'
											variant='primary'
											className='m-1'
										>
											Take Picture
										</Button>
									</ButtonToolbar>
									{this.state.isWebcam ? (
										<Webcam
											screenshotFormat='image/png'
											ref={this.setRef}
											audio={false}
											videoConstraints={videoConstraints}
										/>
									) : (
										''
									)}
								</Card.Body>
							</Card> */}
							<Tabs
								hidden={this.props.mode !== 'add'}
								className='mt-3'
								tabIndex={this.state.account_index}
								onSelect={(e) => {
									this.setState({ account_index: e });
								}}
							>
								<Tab
									hidden={this.props.mode !== 'add'}
									title='I Have an existing account'
									eventKey={0}
								>
									<Card className='border-0'>
										<Card.Body>
											<Card.Title>Search email</Card.Title>
											<FormControl
												type='text'
												name='email'
												id='email'
												value={values.email}
												onChange={handleChange}
												className='m-1'
												placeholder='Enter email address'
											/>

											<FormLabel className='small'>
												<span>User Name: </span>
												<span>
													<strong>{values.username}</strong>
												</span>
											</FormLabel>
											<Button
												onClick={() => {
													this.setState({ isFetchingEmail: true });
													this.props
														.ViewAccountDetailsByEmail({
															email: values.email,
														})
														.then((r) => {
															if (r.data.data.length > 0) {
																var response = r.data.data[0];

																toastr.info(
																	'Email found!',
																	`Email ${response.email} exist in our records`
																);
																setValues({
																	account_id: response.account_id,
																	email: response.email,
																	username: response.username,
																	password: '12345',
																});
															} else {
																toastr.error(
																	'Email not found',
																	'Seems like the account was not on our records'
																);
															}
															this.setState({ isFetchingEmail: false });
														});
												}}
												className='mt-1 float-right'
											>
												{this.state.isFetchingEmail ? (
													<Spinner animation='border' height='sm' />
												) : (
													'Search'
												)}
											</Button>
										</Card.Body>
									</Card>
								</Tab>
								<Tab
									hidden={this.props.mode !== 'add'}
									title='New Account'
									eventKey={1}
								>
									<Card className='border-0'>
										<Card.Body>
											<Card.Title>Account</Card.Title>
											<Form.Row>
												<Form.Group as={Col}>
													<Form.Label>Email</Form.Label>
													<Form.Control
														type='text'
														placeholder='Email'
														name='email'
														id='email'
														value={values.email}
														onChange={handleChange}
														isInvalid={!!errors.email && touched.email}
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.email}
													</Form.Control.Feedback>
												</Form.Group>
											</Form.Row>
											<Form.Row>
												<Form.Group as={Col}>
													<Form.Label>User Name</Form.Label>
													<Form.Control
														type='text'
														placeholder='User Name'
														name='username'
														id='username'
														value={values.username}
														onChange={handleChange}
														isInvalid={!!errors.username && touched.username}
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.username}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Label>Password</Form.Label>
													<Form.Control
														type='password'
														placeholder='Desired Password'
														name='password'
														id='password'
														value={values.password}
														onChange={handleChange}
														isInvalid={!!errors.password && touched.password}
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.password}
													</Form.Control.Feedback>
												</Form.Group>
											</Form.Row>
										</Card.Body>
									</Card>
								</Tab>
							</Tabs>
							<Card className='border-0'>
								<Card.Body>
									<Card.Title>Profile</Card.Title>
									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='First Name'
												name='firstname'
												id='firstname'
												value={values.firstname}
												onChange={handleChange}
												isInvalid={!!errors.firstname && touched.firstname}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.firstname}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group as={Col}>
											<Form.Label>Middle Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='Middle Name'
												name='middlename'
												id='middlename'
												value={values.middlename}
												onChange={handleChange}
												isInvalid={!!errors.middlename && touched.middlename}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.middlename}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group as={Col}>
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='Last Name'
												name='lastname'
												id='lastname'
												value={values.lastname}
												onChange={handleChange}
												isInvalid={!!errors.lastname && touched.lastname}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.lastname}
											</Form.Control.Feedback>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label>Birth Date</Form.Label>
											<Form.Control
												type='date'
												name='birthdate'
												placeholder='Date of birth'
												id='birthdate'
												value={values.birthdate}
												onChange={handleChange}
												isInvalid={!!errors.birthdate && touched.birthdate}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.birthdate}
											</Form.Control.Feedback>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label>Street Address</Form.Label>
											<Form.Control
												type='text'
												name='street_address'
												id='street_address'
												placeholder='Street Address'
												value={values.street_address}
												onChange={handleChange}
												isInvalid={
													!!errors.street_address && touched.street_address
												}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.street_address}
											</Form.Control.Feedback>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label>Barangay</Form.Label>
											<Form.Control
												type='text'
												placeholder='Barangay'
												name='barangay'
												id='barangay'
												value={values.barangay}
												onChange={handleChange}
												isInvalid={!!errors.barangay && touched.barangay}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.barangay}
											</Form.Control.Feedback>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label>City/Municipality</Form.Label>
											<Form.Control
												type='text'
												name='city_municipality'
												id='city_municipality'
												placeholder='City or municipality'
												value={values.city_municipality}
												onChange={handleChange}
												isInvalid={
													!!errors.city_municipality &&
													touched.city_municipality
												}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.city_municipality}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group as={Col}>
											<Form.Label>State/Province</Form.Label>
											<Form.Control
												type='text'
												name='state_province'
												id='state_province'
												placeholder='State or Province'
												value={values.state_province}
												onChange={handleChange}
												isInvalid={
													!!errors.state_province && touched.state_province
												}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.state_province}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group as={Col}>
											<Form.Label>Zip Code</Form.Label>
											<Form.Control
												type='text'
												name='zip_code'
												placeholder='Zip / Postal Code'
												id='zip_code'
												value={values.zip_code}
												onChange={handleChange}
												isInvalid={!!errors.zip_code && touched.zip_code}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.zip_code}
											</Form.Control.Feedback>
										</Form.Group>
									</Form.Row>
									<Form.Row>
										<Form.Group as={Col}>
											<Form.Label>Contact Number</Form.Label>
											<Form.Control
												type='text'
												name='contact_number'
												placeholder='Phone or telephone number'
												id='contact_number'
												value={values.contact_number}
												onChange={handleChange}
												isInvalid={
													!!errors.contact_number && touched.contact_number
												}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.contact_number}
											</Form.Control.Feedback>
										</Form.Group>
									</Form.Row>
									<Form.Row className='float-right'>
										<Button
											disabled={isSubmitting}
											type='submit'
											variant='success'
										>
											{isSubmitting ? (
												<Spinner size='sm' animation='border' />
											) : (
												'Save Profile'
											)}
										</Button>
									</Form.Row>
								</Card.Body>
							</Card>
						</Form>
					</Container>
				)}
			</Formik>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = {
	addAccount: AddAccount,
	updateProfile: updateProfile,
	createProfile: createProfile,
	ViewAccountDetailsByEmail: ViewAccountDetailsByEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordForm);
