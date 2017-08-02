import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import Routes from './routes';
import rootReducer from './reducers';
import { AUTH_USER } from './actions/types';

import './index.css';

// redux store and middleware setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
