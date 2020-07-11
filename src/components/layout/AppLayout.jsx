/** @format */

import React, { Component } from 'react';
import AppNavigation from './Navigation';
import { Switch, Route, Redirect } from 'react-router';
import Records from '../modules/profiles/profilerecords';
import AccountRecords from '../modules/account/accountRecords';

class AppLayout extends Component {
	render() {
		return (
			<div>
				<AppNavigation />
				<Switch>
					<Route path='/profile' component={Records} />
					<Route path='/accounts' component={AccountRecords} />
					<Redirect from='/' to='/profile' />
				</Switch>
			</div>
		);
	}
}

export default AppLayout;
