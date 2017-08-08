import axios from 'axios';
import history from '../history';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_USER } from './types';

const ROOT_URL = 'http://localhost:3000';

export function login({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/auth/login`, { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
      })
      .then(() => history.replace('/dashboard'))
      .catch(() => {
        dispatch(authError('Bad login info'));
      });
  };
}

// export function twitterLogin() {
//   return function(dispatch) {
//     axios
//       .post(`${ROOT_URL}/auth/twitter`)
//       .then(response => {
//         localStorage.setItem('token', response.data.token);
//         dispatch({ type: AUTH_USER });
//       })
//       .then(() => history.replace('/dashboard'))
//       .catch(() => {
//         dispatch(authError('Bad login info'));
//       });
//   };
// }

export function emailSignup({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/auth/email_signup`, { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
      })
      .then(() => history.push('/dashboard'))
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function logout() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/auth/logout`)
      .then(() => {
        localStorage.removeItem('token');
        dispatch({ type: UNAUTH_USER });
      })
      .then(() => history.replace('/'))
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchUser() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/current_user`)
      .then(user => {
        dispatch({
          type: FETCH_USER,
          payload: user.data
        });
      })
      .catch(error => dispatch(authError(error.response.data)));
  };
}
