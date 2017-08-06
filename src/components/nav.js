import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutUser, socialLogin } from '../actions';

import logo from './logo.svg';
import styled from 'styled-components';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSocialSignIn = this.handleSocialSignIn.bind(this);
  }

  handleSocialSignIn() {
    this.props.socialLogin();
  }

  handleSignOut() {
    this.props.signoutUser();
  }

  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/demo">
            Demo
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/" onClick={this.handleSignOut}>
            Sign Out
          </Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/demo">
            Demo
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>,
        <li className="nav-item" key={4} onClick={this.handleSocialSignIn}>
          <a href="/auth/twitter" className="btn btn-block btn-twitter btn-social">
            <i className="fa fa-twitter" />Sign in with Twitter
          </a>
        </li>
      ];
    }
  }

  render() {
    console.log('NAV PROPS', this.props);
    return (
      <div>
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">
            Voting App
          </Link>
          <NavButtons className="nav navbar-nav">
            {this.renderLinks()}
          </NavButtons>
        </nav>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Welcome to React!</h2>
        </Header>
      </div>
    );
  }
}

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

const NavButtons = styled.ul`
  float: right;
  margin-right: 20px;

  > li:hover {
    font-weight: 600;
  }
`;

Nav.propTypes = {
  authenticated: PropTypes.bool,
  signoutUser: PropTypes.func,
  socialLogin: PropTypes.func
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { signoutUser, socialLogin })(Nav);
