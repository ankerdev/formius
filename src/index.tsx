import * as React from 'react';
import { render } from 'react-dom';
import * as yup from 'yup';
import { Form, formius, IValidationRuleArgs, Text } from '../lib';

formius.configure({
  classNames: {
    fieldContainerClassName: 'fieldContainer',
    formClassName: 'form',
  },
});

interface IBasicFormValues {
  email: string;
  firstName: string;
  lastName: string;
}

const App = () => {
  const onSubmit = (values: IBasicFormValues): void => {
    console.log(values);
  };

  // Sync custom validator
  const validateFirstName = ({ value }: IValidationRuleArgs): string | null => {
    return value !== 'John'
      ? 'first name must match John'
      : null;
  };

  // Async custom validator
  const validateLastName = async ({ value }: IValidationRuleArgs): Promise<string | null> => {
    return new Promise(resolve => setTimeout(() => resolve(
      value !== 'Smith'
        ? 'last name must match Smith'
        : null,
    ), 1));
  };

  return (
    <Form onSubmit={onSubmit}>
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
      />
      <button type="submit">Submit</button>
    </Form>
  );
};

render(
  <App />,
  document.getElementById('app'),
);
