import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { emailSignup } from '../../actions';

import styled from 'styled-components';

const Container = styled.div`margin-top: 40px;`;

const Header = styled.h2`
  font-weight: 400;
  margin: 10px 0;
  text-align: center;
`;

// redux-form validation
// http://redux-form.com/6.6.3/examples/syncValidation/
function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match!';
  }

  return errors;
}

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

class SignUp extends Component {
  handleFormSubmit(formProps) {
    this.props.emailSignup(formProps);
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
    console.log('SIGN UP PROPS', this.props);

    return (
      <Container className="row">
        <div className="col-md-6 col-md-offset-3">
          <Header>Sign Up</Header>
          <form
            className="well form-horizontal"
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          >
            <fieldset className="form-group">
              <Field name="email" label="Email:" type="email" component={renderField} />
            </fieldset>
            <fieldset className="form-group">
              <Field name="password" label="Password:" type="password" component={renderField} />
            </fieldset>
            <fieldset className="form-group">
              <Field
                name="passwordConfirm"
                label="Confirm Password:"
                type="password"
                component={renderField}
              />
            </fieldset>
            {this.renderAlert()}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  handleSubmit: PropTypes.func,
  emailSignup: PropTypes.func,
  errorMessage: PropTypes.string
};

renderField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string
};

const form = reduxForm({
  form: 'signup',
  validate
})(SignUp);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { emailSignup })(form);
