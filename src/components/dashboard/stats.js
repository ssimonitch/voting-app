import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Stats extends Component {
  userData(user) {
    return (
      <ul style={{ listStyle: 'none' }}>
        {Object.keys(user).map(key =>
          <li key={key}>
            {key}: {user[key] || 'undefined'}
          </li>
        )}
      </ul>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div style={{ textAlign: 'center' }}>
        <h2>User stats</h2>
        {user && this.userData(user)}
      </div>
    );
  }
}

Stats.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(Stats);
