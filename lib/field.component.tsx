import * as React from 'react';
import { IField, IFieldProps, ITextFieldProps } from './form.declarations';
import { useField } from './use-field.hook';

// @TODO Move to declarations
interface IFieldContainerProps {
  field: IField;
  props: IFieldProps;
}

const FieldContainer = ({ children, field, props }: React.PropsWithChildren<IFieldContainerProps>) => {
  // @TODO Inject global classNames if applied
  return (
    <fieldset>
      <label>
        {props.label && (
          <div>
            {props.label}
          </div>
        )}
        {children}
        {field.touched && field.errors.length > 0 && (
          <div>
            {field.errors.map(error => <div key={error}>{error}</div>)}
          </div>
        )}
      </label>
    </fieldset>
  );
};

// @TODO `props` is not a very descriptive name, fix
export const Text = (props: ITextFieldProps) => {
  const field = useField(props);

  return (
    <FieldContainer field={field} props={props}>
      <input
        onBlur={field.onBlur}
        onChange={({ target: { value } }) => field.onChange(value)}
        onFocus={field.onFocus}
        placeholder={props.placeholder}
        type={props.type}
        value={field.value}
      />
    </FieldContainer>
  );
};
