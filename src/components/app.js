import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as demoActions from '../actions/demo_actions';
import { signinUser, signupUser } from '../actions/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 'large' }}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="signup">
          <button>Test React Router</button>
        </Link>
        <br />
        <br />
        <button onClick={this.props.demoActions.expressTest}>Test if Express is working</button>
        <br />
        <br />
        <button onClick={this.props.demoActions.dbTest}>Test if Express and Sequelize are working</button>
        <div style={{ padding: '30px' }}>
          {this.props.demoResults}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  demoActions: PropTypes.object,
  demoResults: PropTypes.string
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    demoResults: state.demo.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    demoActions: bindActionCreators(demoActions, dispatch),
    signinUser: signinUser,
    signupUser: signupUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
