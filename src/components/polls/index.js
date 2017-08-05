import React, { Component } from 'react';

class MyPolls extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return <div style={{ textAlign: 'center' }}>Poll view</div>;
  }
}

export default MyPolls;
