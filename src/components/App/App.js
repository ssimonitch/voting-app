import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './style.css';

class App extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React - Fullstack!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="signup">
          <button>Test React Router</button>
        </Link>
        <br />
        <br />
        <button onClick={this.props.actions.expressTest}>Test if Express is working</button>
        <br />
        <br />
        <button onClick={this.props.actions.dbTest}>Test if Express and Sequelize are working</button>
        <div style={{ padding: '30px' }}>
          {this.props.results}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  className: PropTypes.object,
  actions: PropTypes.object,
  results: PropTypes.string
};

export default App;
