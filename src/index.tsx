import * as React from 'react';
import { render } from 'react-dom';
import * as yup from 'yup';
import { Form, formius, Text, ValidationRule } from '../lib';

formius.configure({
  classNames: {
    fieldContainerClassName: 'fieldContainer',
    formClassName: 'form',
  },
});

interface IMyFormValues {
  email: string;
  firstName: string;
  lastName: string;
}

const App = () => {
  // Sync custom validator
  const validateFirstName: ValidationRule = ({ value }) => {
    if (value !== 'John') {
      return 'First name must be John';
    }
    return null;
  };

  // Async custom validator
  const validateLastName: ValidationRule = async ({ value }) => {
    return new Promise<string | null>(resolve => setTimeout(() => resolve(
      value !== 'Smith'
        ? 'last name must match Smith'
        : null,
    ), 1));
  };

  // Validator accessing the value of another field in the form
  const validatePasswordConfirmation: ValidationRule = ({ fields, value }) => {
    if (value !== fields.password.value) {
      return 'Password confirmation must match password';
    }
    return null;
  };

  return (
    <Form<IMyFormValues>
      onSubmit={values => console.log('Submitted', values)}
      onValueChange={values => console.log('Value changed', values)}
    >
      <Text
        defaultValue="Jake"
        label="First name"
        name="firstName"
        placeholder="Please enter your first name..."
        validationSchema={yup.string().required().length(4)}
        validationRules={[validateFirstName]}
      />
      <Text
        label="Last name"
        name="lastName"
        placeholder="Please enter your last name..."
        validationRules={[validateLastName]}
      />
      <Text
        label="Email"
        name="email"
        placeholder="Please enter your email..."
        validationSchema={yup.string().required().email()}
      />
      <Text
        label="Password"
        name="password"
        placeholder="Please enter your password..."
        type="password"
        validationSchema={yup.string().required().length(4)}
      />
      <Text
        label="Password confirmation"
        name="passwordConfirmation"
        placeholder="Please confirm your password..."
        type="password"
        validationRules={[validatePasswordConfirmation]}
        validationSchema={yup.string().required().length(4)}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};

render(
  <App />,
  document.getElementById('app'),
);
