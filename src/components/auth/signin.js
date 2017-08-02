import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { signinUser } from '../../actions';

const Container = styled.div`margin-top: 40px;`;

const Header = styled.h2`
  font-weight: 400;
  margin: 10px 0;
  text-align: center;
`;

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <input {...input} className="form-control" type={type} />
    {touched &&
      error &&
      <div className="error">
        {error}
      </div>}
  </div>;

class SignIn extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    console.log('SIGN IN PROPS', this.props);

    return (
      <Container className="row">
        <div className="col-md-6 col-md-offset-3">
          <Header>Sign In</Header>
          <form className="well form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <Field name="email" label="Email:" type="email" component={renderField} />
            </fieldset>
            <fieldset className="form-group">
              <Field name="password" label="Password:" type="password" component={renderField} />
            </fieldset>
            {this.renderAlert()}
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        </div>
      </Container>
    );
  }
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func,
  signinUser: PropTypes.func,
  errorMessage: PropTypes.string
};

renderField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const form = reduxForm({ form: 'signin' })(SignIn);
export default connect(mapStateToProps, { signinUser })(form);
