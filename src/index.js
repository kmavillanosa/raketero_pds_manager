/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	ToastsContainer,
	ToastsStore,
	ToastsContainerPosition,
} from 'react-toasts';

import { BrowserRouter } from 'react-router-dom';

import { history } from './history';

import { Provider } from 'react-redux';

import { store } from './redux';

ReactDOM.render(
	<div>
		<Provider store={store}>
			<BrowserRouter history={history}>
				<ToastsContainer
					store={ToastsStore}
					position={ToastsContainerPosition.BOTTOM_LEFT}
				/>
				<App />
			</BrowserRouter>
		</Provider>
	</div>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
