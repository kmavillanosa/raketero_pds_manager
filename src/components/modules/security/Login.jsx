/** @format */
import React, { Component } from 'react';
import { Form, Row, Button, Spinner } from 'react-bootstrap';
import { logo } from '../../../images';
import { loginValidationRule } from '../../../validationRules/loginValidationRules';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';
import { LoginUser } from '../../../redux/actions/account_actions';

class Login extends Component {
	state = {
		isLoading: false,
		username: null,
		password: null,
	};

	render() {
		return (
			<Formik
				validationSchema={loginValidationRule}
				onSubmit={(values, actions) => {
					actions.setSubmitting(true);
					setTimeout(() => {
						this.props.login(values).then((resp) => {
							if (resp.problem === null) {
								ToastsStore.success('Access Granted');
								actions.setSubmitting(false);
							} else {
								ToastsStore.error('Access Denied');
								actions.setSubmitting(false);
							}
						});
					}, 1000);
				}}
				initialValues={{
					username: this.state.username,
					password: this.state.password,
				}}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors,
					isSubmitting,
				}) => (
					<Form className='login-form-child' noValidate onSubmit={handleSubmit}>
						<Form.Group as={Row}>
							<img className='center' alt='logo' src={logo} />
							<Form.Label className='h3'>Login</Form.Label>
						</Form.Group>
						<Form.Group as={Row}>
							<Form.Label className='h6'>User Name</Form.Label>
							<Form.Control
								size='lg'
								id='username'
								name='username'
								placeholder='Email or Username'
								type='text'
								value={values.username}
								onChange={handleChange}
								onBlur={handleBlur}
								isInvalid={!!errors.username && touched.username}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.username}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Row}>
							<Form.Label className='h6'>Password</Form.Label>
							<Form.Control
								size='lg'
								id='password'
								name='password'
								placeholder='Password'
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								type='password'
								isInvalid={!!errors.password && touched.password}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Row}>
							<Button
								disabled={isSubmitting}
								size='lg'
								className='w-100'
								variant='dark'
								type='submit'
							>
								{isSubmitting ? (
									<div>
										<Spinner
											className='float-right'
											as='span'
											role='status'
											animation='border'
										/>
										Authenticating...
									</div>
								) : (
									'Login'
								)}
							</Button>
						</Form.Group>
					</Form>
				)}
			</Formik>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = {
	login: LoginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
