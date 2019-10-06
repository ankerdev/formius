import * as React from 'react';
import { render } from 'react-dom';
import { Text } from '../lib/field.component';
import { Form } from '../lib/form.component';

interface IBasicFormValues {
  email: string;
  firstName: string;
  lastName: string;
}

const App = () => {
  const onSubmit = (values: IBasicFormValues): void => {
    console.log(values);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Text label="First name" name="firstName" placeholder="Please enter your first name..." />
      <Text label="Last name" name="lastName" placeholder="Please enter your last name..." />
      <Text label="Email" name="email" placeholder="Please enter your email..." />
      <button type="submit">Submit</button>
    </Form>
  );
};

render(
  <App />,
  document.getElementById('app'),
);
