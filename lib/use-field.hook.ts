import * as React from 'react';
import { FormContext } from './form.context';
import { IField, IFieldProps } from './form.declarations';
import { useValidation } from './use-validation.hook';

export const useField = (props: IFieldProps): IField => {
  const [hasFocus, setHasFocus] = React.useState<boolean>(false);
  const [touched, setTouched] = React.useState<boolean>(false);
  const [value, setValue] = React.useState(props.defaultValue || '');
  const [valid, errors] = useValidation(value, touched, props.validationRules);
  const context = React.useContext(FormContext);

  React.useEffect(() => {
    context.setValue(props.name, {
      valid,
      value,
    });
  }, [valid, value]);

  React.useEffect(() => {
    if (context.submitted && !touched) {
      setTouched(true);
    }
  }, [context.submitted]);

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
    valid,
    value,
  };
};
