import React, { Component } from 'react';

class MyPolls extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return <div style={{ textAlign: 'center' }}>Create new poll</div>;
  }
}

export default MyPolls;
