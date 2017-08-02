import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import styled from 'styled-components';

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
  text-align: center;
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

class Nav extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">
            Sign Out
          </Link>
        </li>
      );
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">
            Voting App
          </Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </nav>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Welcome to React!</h2>
        </Header>
      </div>
    );
  }
}

Nav.propTypes = {
  authenticated: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Nav);
