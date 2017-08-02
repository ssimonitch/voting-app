import { EXPRESS_TEST_RESULTS, DB_TEST_RESULTS, EXPRESS_TEST_ERROR, DB_TEST_ERROR } from '../actions/demo_actions';

const demo = (state = { results: '' }, action) => {
  switch (action.type) {
  case EXPRESS_TEST_RESULTS:
    return { ...state, results: 'Test Succeeded!  ' + action.data };
  case DB_TEST_RESULTS:
    return { ...state, results: 'Test Succeeded!  ' + action.data };
  case EXPRESS_TEST_ERROR:
    return { ...state, results: 'Test Failed!  ' + action.data };
  case DB_TEST_ERROR:
    return { ...state, results: 'Test Failed!  ' + action.data };
  default:
    return state;
  }
};

export default demo;
