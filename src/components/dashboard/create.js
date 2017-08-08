import React, { Component } from 'react';

class Create extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return <div style={{ textAlign: 'center' }}>Create new poll</div>;
  }
}

export default Create;
