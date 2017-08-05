import React, { Component } from 'react';

import { connect } from 'react-redux';

class Home extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return <div style={{ textAlign: 'center' }}>Show latest polls here</div>;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null)(Home);
