import * as React from 'react';
import { FormContext } from './form.context';
import { IFormField, IFormFieldsObject, IFormProps } from './form.declarations';
import { cx, throttle, validate } from './form.utils';
import { formius } from './formius.class';

export function Form<T>({ className, children, onSubmit, onValueChange }: IFormProps<T>): JSX.Element {
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
    throttle(reporter, 1);
  };

  const validateFields = async (): Promise<boolean> => {
    return (
      await Promise.all(
        Object
          .values(fields.current)
          .map(args => validate({
            ...args,
            fields: fields.current,
          })),
      )
    ).every(errors => errors.length === 0);
  };

  const values = (): T => Object
    .keys(fields.current)
    .reduce((object, key) => ({
      ...object,
      [key]: fields.current[key].value,
    }), {}) as T;

  return (
    <form
      className={cx(formius.config.classNames.formClassName, className)}
      onSubmit={internalOnSubmit}
    >
      <FormContext.Provider value={{
        setField,
        getFields: () => fields.current,
        submitted: submissionCount > 0,
      }}>
        {children}
      </FormContext.Provider>
    </form>
  );
}
