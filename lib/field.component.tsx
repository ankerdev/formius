import * as React from 'react';

interface IField<T = string> {
  defaultValue?: T;
  hasFocus: boolean;
  label?: string;
  name: string;
  touched: boolean;
  value: T;
  validationRules?: any; // @TODO
}

interface ITextField extends IField<string> {
  disabled: boolean;
  placeholder?: string;
  readOnly?: boolean;
}

interface ICheckboxField extends IField<boolean> {
  options: string[];
}

type Field = ICheckboxField | ITextField;

export const useField = (field: ITextField) => {
  const [hasFocus, setHasFocus] = React.useState<boolean>(false);
  const [touched, setTouched] = React.useState<boolean>(false);
  const [value, setValue] = React.useState(field.value); // @TODO How can I enforce type here?
};
