/** @format */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { accountReducer, profileReducer } from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

var middleware = composeWithDevTools(applyMiddleware(thunk));

var rootReducer = combineReducers({
	account: accountReducer,
	profile: profileReducer,
});

export const store = createStore(rootReducer, middleware);
