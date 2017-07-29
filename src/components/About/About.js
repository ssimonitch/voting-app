// src/components/About/index.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

export default class About extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames('About', className)}>
        <h1>React Router working!</h1>
      </div>
    );
  }
}

About.propTypes = {
  className: PropTypes.object
};
