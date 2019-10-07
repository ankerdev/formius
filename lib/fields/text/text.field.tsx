import * as React from 'react';
import { FieldContainer } from '../../field-container.component';
import { ITextFieldProps } from '../../form.declarations';
import { useField } from '../../use-field.hook';

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
