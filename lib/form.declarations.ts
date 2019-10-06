import * as React from 'react';

// @TODO Can I safely say that value is always string?
// @TODO Should I follow React's interface for defaultValue?:
// React.InputHTMLAttributes<HTMLInputElement>.value?: string | number | string[] | undefined

// @TODO Add prop to disable globalClassNames per field?
export interface IFieldClassNames {
  errorClassName?: string;
  errorContainerClassName?: string;
  fieldContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export interface IGlobalClassNames extends IFieldClassNames {
  formClassName?: string;
}

export interface IFormProps {
  children?: React.ReactNode;
  onSubmit: ((values: any) => void | Promise<void>);
}

export interface IFieldProps extends IFieldClassNames {
  defaultValue?: any;
  label?: string;
  name: string;
  validationRules?: any;
}

export interface ICheckboxField extends IFieldProps {
  content: React.ReactNode;
}

export interface IRadioFieldProps extends IFieldWithOptionsProps {}

export interface ISelectField extends IFieldWithOptionsProps {}

export interface ITextFieldProps extends IFieldProps {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
}

export interface ITextareaFieldProps extends ITextFieldProps {}

export interface IFieldOption {
  label: number | string;
  value: any;
}

export interface IFieldWithOptionsProps extends IFieldProps {
  options: IFieldOption[];
}

export interface IFormFieldValue {
  valid: boolean;
  value: any;
}

export interface IFormFieldValuesObject {
  [key: string]: IFormFieldValue;
}

export interface IFormContext {
  getValues: () => IFormFieldValuesObject;
  setValue: (key: string, value: IFormFieldValue) => void;
  submitted: boolean;
}

export interface IField {
  errors: string[];
  hasFocus: boolean;
  onBlur: () => void;
  onChange: (value: any) => void;
  onFocus: () => void;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setTouched: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<any>;
  touched: boolean;
  valid: boolean;
  value: any;
}
