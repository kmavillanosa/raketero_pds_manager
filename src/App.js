/** @format */

import React, { Component } from 'react';

import './App.css';
import Login from './components/modules/security/Login';
import { connect } from 'react-redux';
import AppLayout from './components/layout/AppLayout';

class App extends Component {
	render() {
		return this.props.isLogged === true ||
			localStorage.getItem('token') !== null ? (
			<AppLayout />
		) : (
			<div>
				<Login />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged: state.profile.isLogged,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
