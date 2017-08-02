import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Home extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return (
      <div style={{ textAlign: 'center' }}>
        <Link to="demo">
          <button>Go to demo page</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null)(Home);
