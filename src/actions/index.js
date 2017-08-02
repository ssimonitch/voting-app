import axios from 'axios';
import history from '../history';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/auth/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad login info'));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/auth/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/feature');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  history.push('/');
  return {
    type: UNAUTH_USER
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/auth/test`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })
      .catch(error => dispatch(authError(error.response.data)));
  };
}
