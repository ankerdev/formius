import * as React from 'react';

// @TODO implement ability to pass user specific function or a yup schema
export const useValidation = (value: any, touched: boolean, validationRules: any): [boolean, string[]] => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [valid, setValid] = React.useState<boolean>(false);

  // @TODO
  const validate = () => {
    if (value.length > 0) {
      setErrors([]);
      setValid(true);
    } else {
      setErrors(['This field is required']);
      setValid(false);
    }
  };

  React.useEffect(() => {
    if (touched) {
      validate();
    }
  }, [touched, value]);

  return [valid, errors];
};
