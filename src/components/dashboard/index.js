import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return <div style={{ textAlign: 'center' }}>Dashboard view</div>;
  }
}

export default Dashboard;
