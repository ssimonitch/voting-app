import React, { Component } from 'react';

class Poll extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return <div style={{ textAlign: 'center' }}>Poll view</div>;
  }
}

export default Poll;
