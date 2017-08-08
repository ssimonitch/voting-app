import React, { Component } from 'react';
import history from '../history';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import * as actions from '../actions';

import Nav from './Nav';
import Landing from './Landing';
import Demo from './Demo';
import Create from './dashboard/create';
import Stats from './dashboard/stats';
import SignUp from './auth/signup';
import SignIn from './auth/signin';
import NotFound from './NotFound';

import RequireAuth from '../containers/require_auth';

class App extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.fetchUser();
    }
  }

  render() {
    console.log('APP PROPS', this.props);
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={Nav} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/demo" component={Demo} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/dashboard/stats" component={RequireAuth(Stats)} />
            <Route exact path="/dashboard/create" component={RequireAuth(Create)} />
            <Redirect from="/dashboard" to="/dashboard/stats" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired
};

function mapStateToProps({ auth }) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(App);
