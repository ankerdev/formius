import * as React from 'react';
import { FormContext } from './form.context';
import { IField, IFieldProps, IValidationParameters } from './form.declarations';
import { validate } from './form.utils';

export const useField = (props: IFieldProps): IField => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [hasFocus, setHasFocus] = React.useState<boolean>(false);
  const [touched, setTouched] = React.useState<boolean>(false);
  const [value, setValue] = React.useState(props.defaultValue || '');

  const context = React.useContext(FormContext);

  const { name, validationRules, validationSchema } = props;
  const validationParameters: IValidationParameters = {
    validationRules,
    validationSchema,
    value,
  };

  const validateField = async (): Promise<void> => {
    const validationErrors = await validate(validationParameters);
    setErrors(validationErrors);
  };

  React.useEffect(() => {
    context.setField(name, validationParameters);
  }, [value]);

  React.useEffect(() => {
    if (context.submitted && !touched) {
      setTouched(true);
    }
  }, [context.submitted]);

  React.useEffect(() => {
    if (touched) {
      validateField();
    }
  }, [touched, value]);

  const onBlur = (): void => {
    setHasFocus(false);
    setTouched(true);
  };

  const onChange = (value: any): void => {
    setValue(value);
  };

  const onFocus = (): void => {
    setHasFocus(true);
  };

  return {
    errors,
    hasFocus,
    onBlur,
    onChange,
    onFocus,
    setHasFocus,
    setTouched,
    setValue,
    touched,
    value,
  };
};
