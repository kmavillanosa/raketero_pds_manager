/** @format */

import React, { Component } from 'react';
import AppNavigation from './Navigation';
import { Switch, Route } from 'react-router';
import Records from '../modules/record/records';

class AppLayout extends Component {
	render() {
		return (
			<div>
				<AppNavigation />
				<Switch>
					<Route location='/records' component={Records} />
					<Route location='*' component={<p>Page Not Found</p>} />
				</Switch>
			</div>
		);
	}
}

export default AppLayout;
