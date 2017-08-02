import React from 'react';
import history from './history';

import Nav from './components/nav';
import Home from './components/home';
import Demo from './components/demo';
import Feature from './components/feature';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import RequireAuth from './containers/require_auth';

// check out history and this
// https://github.com/ReactTraining/react-router/issues/3498

import { Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={Home} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/feature" component={RequireAuth(Feature)} />
      </div>
    </Router>
  );
};

export default Routes;
