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
import { history } from './history';

import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import { store } from './redux';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

ReactDOM.render(
	<Router history={history}>
		<Provider store={store}>
			<ReduxToastr
				timeOut={4000}
				newestOnTop={false}
				preventDuplicates
				position='top-right'
				getState={(state) => state.toastr} // This is the default
				transitionIn='fadeIn'
				transitionOut='fadeOut'
				closeOnToastrClick
			/>
			<ToastsContainer
				store={ToastsStore}
				position={ToastsContainerPosition.BOTTOM_LEFT}
			/>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
