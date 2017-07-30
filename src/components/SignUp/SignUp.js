// src/components/About/index.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`margin-top: 40px;`;

const Header = styled.h2`
  font-weight: 400;
  margin: 10px 0;
  text-align: center;
`;

export default class SignUp extends Component {
  render() {
    return (
      <Container className="row">
        <div className="col-md-6 col-md-offset-3">
          <form className="well form-horizontal" id="signup" name="signup" method="post" action="/signup">
            <fieldset>
              <Header>Sign Up</Header>
              <div className="form-group">
                <label className="col-md-4 control-label">Email</label>
                <input className="form-control" name="email" type="email" />
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Password</label>
                <input className="form-control" name="password" type="password" />
              </div>
              {/* <div className="form-group">
                <label className="col-md-4 control-label">Confirm Password</label>
                <input className="form-control" name="confirm_password" type="password" />
              </div> */}
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  className: PropTypes.object
};
