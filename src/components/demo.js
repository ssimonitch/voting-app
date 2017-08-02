import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as demoActions from '../actions/demo_actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Demo extends Component {
  render() {
    console.log('APP PROPS', this.props);
    return (
      <div style={{ textAlign: 'center' }}>
        <br />
        <button onClick={this.props.demoActions.expressTest}>Test if Express is working</button>
        <br />
        <br />
        <button onClick={this.props.demoActions.dbTest}>Test if Express and Sequelize are working</button>
        <div style={{ padding: '30px' }}>
          {this.props.demoResults}
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  demoActions: PropTypes.object,
  demoResults: PropTypes.string
};

function mapStateToProps(state) {
  return {
    demoResults: state.demo.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    demoActions: bindActionCreators(demoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
