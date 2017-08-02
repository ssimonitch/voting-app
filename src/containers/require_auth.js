import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
  HOC to wrap routes that we want to require authentication
*/

export default function(ComposedComponent) {
  class Authentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired
    };

    // handle case of accessing resource while signed out
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    // handle case of accessing resource while chaging from signed in to signed out
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      // wrap compnent to provide authentication
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
