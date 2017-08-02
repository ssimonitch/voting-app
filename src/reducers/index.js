import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import demo from './demo_reducers';
import auth from './auth_reducers';

const rootReducer = combineReducers({
  auth,
  demo,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
