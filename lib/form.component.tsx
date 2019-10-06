import * as React from 'react';
import { FormContext } from './form.context';
import { IFormFieldValue, IFormFieldValuesObject, IFormProps } from './form.declarations';

export const Form = ({ children, onSubmit }: IFormProps) => {
  const formRef = React.createRef<HTMLFormElement>();
  const [submissionCount, setSubmissionCount] = React.useState<number>(0);
  const [values, setValues] = React.useState<IFormFieldValuesObject>({});

  React.useEffect(() => {
    if (submissionCount && isValid()) {
      onSubmit(
        Object
          .keys(values)
          .reduce((object, key) => ({
            ...object,
            [key]: values[key].value,
          }), {}),
      );
    }
  }, [submissionCount]);

  const getValues = (): IFormFieldValuesObject => values;

  const internalOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionCount(submissionCount + 1);
  };

  const isValid = (): boolean => {
    return Object
      .values(values)
      .every(({ valid }) => valid);
  };

  const setValue = (key: string, value: IFormFieldValue): void => setValues({
    ...values,
    [key]: value,
  });

  return (
    <form
      onSubmit={internalOnSubmit}
      ref={formRef}
    >
      <FormContext.Provider value={{
        getValues,
        setValue,
        submitted: submissionCount > 0,
      }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};
