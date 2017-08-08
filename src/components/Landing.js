import React, { Component } from 'react';

import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    return <div style={{ textAlign: 'center' }}>Show latest polls here</div>;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null)(Landing);
