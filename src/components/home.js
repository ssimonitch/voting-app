import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';

import styled from 'styled-components';
import logo from './logo.svg';

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Welcome to React - Fullstack!</h2>
        </Header>
        <p style={{ fontSize: 'large' }}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="signup">
          <button>Test React Router</button>
        </Link>
        <br />
        <br />
        <button onClick={this.props.actions.expressTest}>Test if Express is working</button>
        <br />
        <br />
        <button onClick={this.props.actions.dbTest}>Test if Express and Sequelize are working</button>
        <div style={{ padding: '30px' }}>
          {this.props.results}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object,
  results: PropTypes.string
};

function mapStateToProps(state) {
  return {
    results: state.demo.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
