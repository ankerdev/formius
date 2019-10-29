import * as React from 'react';
import { FormContext } from './form.context';
import { IFormField, IFormFieldsObject, IFormProps } from './form.declarations';
import { cx, throttle, validate } from './form.utils';
import { formius } from './formius.class';

export const Form = ({ className, children, onSubmit, onValueChange }: IFormProps) => {
  const [submissionCount, setSubmissionCount] = React.useState<number>(0);
  const fields = React.useRef<IFormFieldsObject>({});

  const reporter = (): void => {
    onValueChange && onValueChange(values());
  };

  const internalOnSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmissionCount(submissionCount + 1);
    const isValid = await validateFields();
    if (isValid) {
      onSubmit(values());
    }
  };

  const setField = (key: string, value: IFormField): void => {
    fields.current = {
      ...fields.current,
      [key]: value,
    };
    throttle(1, reporter);
  };

  const validateFields = async (): Promise<boolean> => {
    return (
      await Promise.all(
        Object
          .values(fields.current)
          .map(args => validate(args)),
      )
    ).every(errors => errors.length === 0);
  };

  const values = (): {} => Object
    .keys(fields.current)
    .reduce((object, key) => ({
      ...object,
      [key]: fields.current[key].value,
    }), {});

  return (
    <form
      className={cx(formius.config.classNames.formClassName, className)}
      onSubmit={internalOnSubmit}
    >
      <FormContext.Provider value={{
        setField,
        submitted: submissionCount > 0,
      }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};
