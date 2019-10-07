import * as React from 'react';
import { FormContext } from './form.context';
import { IFormFieldValue, IFormFieldValuesObject, IFormProps } from './form.declarations';
import { validate } from './form.utils';

export const Form = ({ children, onSubmit }: IFormProps) => {
  const [submissionCount, setSubmissionCount] = React.useState<number>(0);
  const fields = React.useRef<IFormFieldValuesObject>({});

  const internalOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionCount(submissionCount + 1);
    const isValid = await validateFields();
    if (isValid) {
      onSubmit(iterableFields().map(({ value }) => value));
    }
  };

  const iterableFields = () => Object.values(fields.current);

  const setField = (key: string, value: IFormFieldValue): void => {
    fields.current = {
      ...fields.current,
      [key]: value,
    };
  };

  const validateFields = async (): Promise<boolean> => {
    return (
      await Promise.all(
        iterableFields().map(args => validate(args)),
      )
    ).every(errors => errors.length === 0);
  };

  return (
    <form onSubmit={internalOnSubmit}>
      <FormContext.Provider value={{
        setField,
        submitted: submissionCount > 0,
      }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};
